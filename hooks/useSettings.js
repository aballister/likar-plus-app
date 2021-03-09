import { useContext } from 'react';
import { SettingsContext } from '../context';

export default function useSettings() {
    return useContext(SettingsContext);
}