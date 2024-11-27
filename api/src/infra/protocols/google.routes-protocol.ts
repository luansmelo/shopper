export interface GoogleRoutesProtocol {
    load(params: GoogleRoutesProtocol.Params): Promise<GoogleRoutesProtocol.Result>
}

export namespace GoogleRoutesProtocol {
    export type Params = {
        origin: string
        destination: string
    }

    export type Result = {
        routes: {
            legs: {
                distanceMeters: number
                duration: string
                startLocation: { latLng: { latitude: number, longitude: number } }
                endLocation: { latLng: { latitude: number, longitude: number } },
                localizedValues: {
                    duration: { text: string },
                },
            }[]
        }[]
    }
}