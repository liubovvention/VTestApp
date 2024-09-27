import {CityWeather} from 'types/weather';

export enum ScreenNames {
  Home = 'Home',
  Weather = 'Weather',
  Details = 'Details', 
  Settings = 'Settings',
  GeneralSettings = 'General Settings',
  Info = 'App Info',
  Contacts = 'Contacts',
  Logout = 'Log Out'
}

export type StackParamList = {
  Home: undefined;
  Weather: undefined;
  Details: CityWeather; // Screen "City Weather"
  Settings: undefined;
  Contacts: undefined;
  'Log Out': undefined;
  'App Info': undefined;
};
