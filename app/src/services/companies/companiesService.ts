import { supabase } from '../../initSupabase'
import haversine from 'haversine-distance'


interface UserLocation {
  latitude: number
  longitude: number
}

export class CompaniesService {
  static queryBuilder = supabase.from('companies')

  static async getAllWithLocations() {
    const { data } = await CompaniesService.queryBuilder.select('*, locations(*)').throwOnError()

    if (data === null) return []

    // TODO: Remove the possibility of a company without locations
    return data.filter(company => company.locations.length)
  }

  static async getCompaniesSortedByProximity(userLocation: UserLocation) {
    const companies = await CompaniesService.getAllWithLocations()

    if (!userLocation) {
      console.log('No user location!')
      return companies
    }


    return companies.sort((a, b) => {
      const aDistance = haversine(userLocation, CompaniesService.getNearestLocationInCompany(a.locations, userLocation))
      const bDistance = haversine(userLocation, CompaniesService.getNearestLocationInCompany(b.locations, userLocation))

      return aDistance - bDistance
    })
  }
  static getNearestLocationInCompany(locations: any, userLocation: UserLocation) {

    return [...locations].sort((a: any, b: any) => {
      const aDistance = haversine(userLocation, { latitude: a.latitude, longitude: a.longitude })
      const bDistance = haversine(userLocation, { latitude: b.latitude, longitude: b.longitude })

      return aDistance - bDistance
    })[0]
  }
}
