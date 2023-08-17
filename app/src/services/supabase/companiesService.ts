import { supabase } from '../../initSupabase'
import haversine from 'haversine-distance'
import { Location, LocationCoordinates, LocationsService } from './locationService'

export interface Company {
  id?: string
  name: string
  created_at?: string
  owner_id: string
}

export class CompaniesServiceInstance {
  queryBuilder = supabase.from('companies')

  async getAllWithLocations() {
    const { data } = await this.queryBuilder.select('*, locations(*)').throwOnError()

    if (data === null) {
      return []
    }

    // This filter should be removed and add companies without location never happens, but I will let it avoiding
    // problems.
    return data.filter(company => company.locations.length)
  }

  async getCompaniesSortedByProximity(locationCoordinates: LocationCoordinates) {
    const companies = await this.getAllWithLocations()

    if (!locationCoordinates) {
      console.log('No user location!')
      return companies
    }

    return companies.sort((a, b) => {
      const aDistance =
        haversine(locationCoordinates, this.getNearestLocationInCompany(a.locations, locationCoordinates))
      const bDistance =
        haversine(locationCoordinates, this.getNearestLocationInCompany(b.locations, locationCoordinates))

      return aDistance - bDistance
    })
  }
  getNearestLocationInCompany(locations: any, locationCoordinates: LocationCoordinates) {

    return [...locations].sort((a: any, b: any) => {
      const aDistance = haversine(locationCoordinates, { latitude: a.latitude, longitude: a.longitude })
      const bDistance = haversine(locationCoordinates, { latitude: b.latitude, longitude: b.longitude })

      return aDistance - bDistance
    })[0]
  }

  async createCompany(company: Company) {
    const { data: companyData } = await this.queryBuilder.insert(company).throwOnError().single()

    return companyData
  }

  async deleteCompany(id: string) {
    await this.queryBuilder.delete().eq('id', id).throwOnError()
  }

  async createCompanyWithLocation(
    company: Company,
    location: Omit<Location, 'company_id'>): Promise<void> {

    let companyId = null
    let locationId = null
    try {
      const companyData = await this.createCompany(company)
      companyId = companyData.id

      const locationData = await LocationsService.create({
        ...location,
        company_id: companyData.id
      })
      locationId = locationData.id
    } catch (error) {
      if (companyId) {
        await this.deleteCompany(companyId)
      }
      if (locationId) {
        await LocationsService.delete(locationId)
      }

      throw error
    }
  }
}

export const CompaniesService = new CompaniesServiceInstance()

