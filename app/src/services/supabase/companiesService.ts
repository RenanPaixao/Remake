import { supabase } from '../../initSupabase'
import haversine from 'haversine-distance'
import { Location, LocationCoordinates, LocationsService } from './locationService'

export interface Company {
  id?: string
  name: string
  created_at?: string
  owner_id: string
}

export class CompaniesService {
  static queryBuilder = supabase.from('companies')

  static async getAllWithLocations() {
    const { data } = await CompaniesService.queryBuilder.select('*, locations(*)').throwOnError()

    if (data === null) {
      return []
    }

    // This filter should be removed and add companies without location never happens, but I will let it avoiding
    // problems.
    return data.filter(company => company.locations.length)
  }

  static async getCompaniesSortedByProximity(locationCoordinates: LocationCoordinates) {
    const companies = await CompaniesService.getAllWithLocations()

    if (!locationCoordinates) {
      console.log('No user location!')
      return companies
    }

    return companies.sort((a, b) => {
      const aDistance = haversine(locationCoordinates, CompaniesService
        .getNearestLocationInCompany(a.locations, locationCoordinates))
      const bDistance = haversine(locationCoordinates, CompaniesService
        .getNearestLocationInCompany(b.locations, locationCoordinates))

      return aDistance - bDistance
    })
  }
  static getNearestLocationInCompany(locations: any, locationCoordinates: LocationCoordinates) {

    return [...locations].sort((a: any, b: any) => {
      const aDistance = haversine(locationCoordinates, { latitude: a.latitude, longitude: a.longitude })
      const bDistance = haversine(locationCoordinates, { latitude: b.latitude, longitude: b.longitude })

      return aDistance - bDistance
    })[0]
  }

  static async createCompany(company: Company) {
    const { data: companyData } = await CompaniesService.queryBuilder.insert(company).throwOnError().single()

    return companyData
  }

  static async deleteCompany(id: string) {
    const { data: companyData } = await CompaniesService.queryBuilder.delete().eq('id', id).throwOnError().single()

    return companyData
  }

  static async createCompanyWithLocation(
    company: Company,
    location: Omit<Location, 'company_id'>): Promise<void> {

    try {
      const companyData = await CompaniesService.createCompany(company)

      await LocationsService.create({
        ...location,
        company_id: companyData.id
      })
    } catch (error) {
      console.log(error)
      if (company.id) {
        await CompaniesService.deleteCompany(company.id)
      }
      if (location.id) {
        await LocationsService.delete(location.id)
      }

      throw error
    }
  }
}
