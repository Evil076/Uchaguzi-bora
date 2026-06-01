import { County } from '../types';
import { KENYAN_LOCATIONS } from '../constants';

export interface VoterRegistration {
    idNumber: string;
    fullName: string;
    countyId: string;
    constituencyId: string;
    pollingStation: string;
    isRegistered: boolean;
}

class IebcService {
    // Mock Database of Registered Voters
    private mockDatabase: Record<string, VoterRegistration> = {
        "12345678": {
            idNumber: "12345678",
            fullName: "John Kamau",
            countyId: "county_047", // Nairobi
            constituencyId: "const_westlands",
            pollingStation: "Westlands Primary School",
            isRegistered: true
        },
        "87654321": {
            idNumber: "87654321",
            fullName: "Amina Mohamed",
            countyId: "county_001", // Mombasa
            constituencyId: "const_nyali",
            pollingStation: "Nyali High School",
            isRegistered: true
        },
        "11223344": {
            idNumber: "11223344",
            fullName: "Kevin Omondi",
            countyId: "county_042", // Kisumu
            constituencyId: "const_kisumu_central",
            pollingStation: "Kisumu Boys High",
            isRegistered: true
        }
    };

    /**
     * Simulates an API call to the IEBC servers to verify a National ID
     */
    async verifyVoter(idNumber: string): Promise<VoterRegistration | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const voter = this.mockDatabase[idNumber];
                if (voter) {
                    resolve(voter);
                } else {
                    // If not in our mock DB, return null (not registered)
                    resolve(null);
                }
            }, 1500); // Simulate network latency
        });
    }

    /**
     * Helper to get location details from IDs
     */
    getLocationDetails(countyId: string, constituencyId: string) {
        const county = KENYAN_LOCATIONS.find(c => c.id === countyId);
        const constituency = county?.constituencies.find(c => c.id === constituencyId);
        return { county, constituency };
    }
}

export const iebcService = new IebcService();
