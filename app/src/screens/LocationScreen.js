import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const LocationsScreen = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:3000/locations');
                setLocations(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLocations();
    }, []);

    return (
        <View>
            {locations.map((location) => (
                <View key={location.id}>
                    <Text>{location.name}</Text>
                    <Text>{location.description}</Text>
                    <Text>{location.location}</Text>
                    <Text>{location.trashType}</Text>
                </View>
            ))}
            <Button title="Add Location" onPress={() => { }} />
        </View>
    );
};

export default LocationsScreen;