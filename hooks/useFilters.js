import { useEffect, useState } from 'react';

export default function useFilters(data, filters, sortFn) {
    const [result, setResult] = useState(data);

    useEffect(() => {
        setResult(data);
    }, [data]);

    useEffect(() => {
        let newData = [...result];
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
    }, [filters]);

    return [result];
}