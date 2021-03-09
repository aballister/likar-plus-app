import { useEffect, useState } from 'react';

export default function useFilters(data, filters, sortFn) {
    const [initialData, setInitialData] = useState([]);
    const [result, setResult] = useState([]);

    useEffect(() => {
        setInitialData(data);
    }, [data]);

    useEffect(() => {
        let newData = [...initialData];
        if (Object.keys(filters).length) {
            if (Object.values(filters.districts).find(el => el)) {
                const trueDistricts = (Object.keys(filters.districts)
                    .filter(district => filters.districts[district]));
                newData = newData.filter(el => Object.keys(el.districts)
                    .filter(district => el.districts[district])
                    .some(district => trueDistricts.includes(district)));
            }
            if (filters.specialization) {
                newData = newData.filter(el => el.specialization === filters.specialization);
            }
            if (sortFn) {
                newData.sort(sortFn);
            }
        }
        setResult(newData);
    }, [initialData, filters]);

    return [result];
}