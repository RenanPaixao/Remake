import { supabase } from '../../initSupabase'
import haversine from 'haversine-distance'
import { LocationCoordinates, LocationsService, LocationWithoutCoordinates } from './locationService'
import { BrasilService } from '../brasilApi/brasilApi'

export interface Company {
  id?: string
  name: string
  created_at?: string
}

export class CompaniesService {
  static queryBuilder = supabase.from('companies')

  static async getAllWithLocations() {
    const { data } = await CompaniesService.queryBuilder.select('*, locations(*)').throwOnError()

    if (data === null) return []

    // TODO: Remove the possibility of a company without locations
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

  static async createCompanyWithLocation(company: Company, location: Omit<LocationWithoutCoordinates, 'company_id'>) {
    try {
      const onlyNumbersCep = location.cep.replace(/\D/g, '')
      const cepData = await BrasilService.getCep(onlyNumbersCep)

      const companyData = await CompaniesService.createCompany(company)

      await LocationsService.create({
        ...location,
        company_id: companyData.id,
        latitude: cepData.location.coordinates.latitude,
        longitude: cepData.location.coordinates.longitude
      })
    } catch (e) {
      alert(e.message)

      if (company.id) {
        await CompaniesService.deleteCompany(company.id)
      }
      if (location.id) {
        await LocationsService.delete(location.id)
      }
    }
  }
}
