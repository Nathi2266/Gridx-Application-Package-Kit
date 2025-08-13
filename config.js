import { Platform } from 'react-native';

const ANDROID_EMULATOR_HOST = '10.0.2.2';
const LOCALHOST = 'localhost';

export const API_BASE_URL = Platform.select({
	web: `http://${LOCALHOST}:5000`,
	ios: `http://${LOCALHOST}:5000`,
	android: `http://${ANDROID_EMULATOR_HOST}:5000`,
});
