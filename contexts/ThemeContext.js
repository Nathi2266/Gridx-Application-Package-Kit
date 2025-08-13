import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme as NavDarkTheme, DefaultTheme as NavDefaultTheme } from '@react-navigation/native';

const THEME_KEY = 'app_theme_preference';

export const ThemeContext = createContext({
	theme: 'light',
	colors: {
		background: '#FFFFFF',
		card: '#f7f7f8',
		text: '#111111',
		muted: '#666666',
		primary: '#0a84ff',
		border: '#e5e5e5',
	},
	setTheme: (_next) => {},
	toggleTheme: () => {},
	navigationTheme: NavDefaultTheme,
});

const lightColors = {
	background: '#FFFFFF',
	card: '#f7f7f8',
	text: '#111111',
	muted: '#666666',
	primary: '#0a84ff',
	border: '#e5e5e5',
};

const darkColors = {
	background: '#121212',
	card: '#1e1e1e',
	text: '#f2f2f2',
	muted: '#aaaaaa',
	primary: '#0a84ff',
	border: '#2a2a2a',
};

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		(async () => {
			try {
				const saved = await AsyncStorage.getItem(THEME_KEY);
				if (saved === 'light' || saved === 'dark') {
					setTheme(saved);
				}
			} catch {}
		})();
	}, []);

	const persistTheme = useCallback(async (next) => {
		try {
			await AsyncStorage.setItem(THEME_KEY, next);
		} catch {}
	}, []);

	const setThemeAndPersist = useCallback(
		(next) => {
			setTheme(next);
			persistTheme(next);
		},
		[persistTheme]
	);

	const toggleTheme = useCallback(() => {
		setThemeAndPersist(theme === 'light' ? 'dark' : 'light');
	}, [theme, setThemeAndPersist]);

	const colors = theme === 'dark' ? darkColors : lightColors;

	const navigationTheme = useMemo(() => {
		if (theme === 'dark') {
			return {
				...NavDarkTheme,
				colors: {
					...NavDarkTheme.colors,
					primary: colors.primary,
					background: colors.background,
					card: colors.card,
					text: colors.text,
					border: colors.border,
				},
			};
		}
		return {
			...NavDefaultTheme,
			colors: {
				...NavDefaultTheme.colors,
				primary: colors.primary,
				background: colors.background,
				card: colors.card,
				text: colors.text,
				border: colors.border,
			},
		};
	}, [theme, colors]);

	const value = useMemo(
		() => ({ theme, colors, setTheme: setThemeAndPersist, toggleTheme, navigationTheme }),
		[theme, colors, setThemeAndPersist, toggleTheme, navigationTheme]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}


