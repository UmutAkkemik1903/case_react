import React, { createContext, useContext, useState } from 'react';

interface FilterContextType {
    startingCity: number | undefined;
    destinationCity: number | undefined;
    tripDate: string | undefined;
    setStartingCity: (cityId: number | undefined) => void;
    setDestinationCity: (cityId: number | undefined) => void;
    setTripDate: (date: string | undefined) => void;
}

const Context = createContext<FilterContextType | undefined>(undefined);

export function useFilterContext() {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useFilterContext must be used within a FilterContextProvider');
    }
    return context;
}

export const FilterContextProvider: React.FC = ({ children }) => {
    const [startingCity, setStartingCity] = useState<number | undefined>();
    const [destinationCity, setDestinationCity] = useState<number | undefined>();
    const [tripDate, setTripDate] = useState<string | undefined>();

    const contextValue: FilterContextType = {
        startingCity,
        destinationCity,
        tripDate,
        setStartingCity,
        setDestinationCity,
        setTripDate,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};