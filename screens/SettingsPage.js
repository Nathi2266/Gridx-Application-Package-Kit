import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Switch, ScrollView, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import { fetchMe, updateProfile, changePassword, updateNotifications } from '../api';

const THEME_KEY = 'app_theme_preference';

const SettingsPage = () => {
	const navigation = useNavigation();
	const { token, logout } = useContext(AuthContext);

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [changingPwd, setChangingPwd] = useState(false);

	const [profile, setProfile] = useState({
		full_name: '',
		email: '',
		phone_number: '',
		profile_image_url: '',
		notifications_enabled: true,
	});

	const [editMode, setEditMode] = useState(false);
	const [theme, setTheme] = useState('light');

	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');

	const loadTheme = useCallback(async () => {
		try {
			const t = await AsyncStorage.getItem(THEME_KEY);
			if (t) setTheme(t);
		} catch {}
	}, []);

	const saveTheme = useCallback(async (next) => {
		try {
			setTheme(next);
			await AsyncStorage.setItem(THEME_KEY, next);
		} catch (e) {
			Alert.alert('Theme', 'Failed to save theme preference');
		}
	}, []);

	const loadProfile = useCallback(async () => {
		if (!token) return;
		setLoading(true);
		const res = await fetchMe(token);
		if (res.success) {
			setProfile({
				full_name: res.data.full_name || '',
				email: res.data.email || '',
				phone_number: res.data.phone_number || '',
				profile_image_url: res.data.profile_image_url || '',
				notifications_enabled: !!res.data.notifications_enabled,
			});
		} else {
			Alert.alert('Profile', res.error || 'Failed to load profile');
		}
		setLoading(false);
	}, [token]);

	useEffect(() => {
		loadTheme();
		loadProfile();
	}, [loadTheme, loadProfile]);

	const onSaveProfile = async () => {
		setSaving(true);
		const res = await updateProfile({
			token,
			full_name: profile.full_name,
			email: profile.email,
			phone_number: profile.phone_number,
			profile_image_url: profile.profile_image_url,
		});
		setSaving(false);
		if (res.success) {
			Alert.alert('Profile', 'Profile updated successfully');
			setEditMode(false);
			loadProfile();
		} else {
			Alert.alert('Profile', res.error || 'Failed to update profile');
		}
	};

	const onChangePassword = async () => {
		if (!currentPassword || !newPassword || !confirmNewPassword) {
			Alert.alert('Password', 'Please fill all password fields');
			return;
		}
		if (newPassword !== confirmNewPassword) {
			Alert.alert('Password', 'New passwords do not match');
			return;
		}
		setChangingPwd(true);
		const res = await changePassword({ token, current_password: currentPassword, new_password: newPassword });
		setChangingPwd(false);
		if (res.success) {
			Alert.alert('Password', 'Password changed successfully');
			setCurrentPassword('');
			setNewPassword('');
			setConfirmNewPassword('');
		} else {
			Alert.alert('Password', res.error || 'Failed to change password');
		}
	};

	const onToggleNotifications = async (value) => {
		setProfile((p) => ({ ...p, notifications_enabled: value }));
		const res = await updateNotifications({ token, enabled: value });
		if (!res.success) {
			Alert.alert('Notifications', res.error || 'Failed to update notifications');
			setProfile((p) => ({ ...p, notifications_enabled: !value }));
		}
	};

	const goToTransactions = () => {
		// Adjust route name if you have a dedicated transactions screen
		navigation.navigate('TopUp');
	};

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.profileCard}>
				<Image
					source={profile.profile_image_url ? { uri: profile.profile_image_url } : require('../assets/icon.png')}
					style={styles.avatar}
				/>
				<Text style={styles.name}>{profile.full_name || 'Unnamed User'}</Text>
				<Text style={styles.email}>{profile.email}</Text>

				{!editMode ? (
					<TouchableOpacity style={styles.editButton} onPress={() => setEditMode(true)}>
						<Text style={styles.editButtonText}>Edit Profile</Text>
					</TouchableOpacity>
				) : (
					<View style={{ width: '100%' }}>
						<TextInput
							style={styles.input}
							placeholder="Full name"
							value={profile.full_name}
							onChangeText={(t) => setProfile((p) => ({ ...p, full_name: t }))}
						/>
						<TextInput
							style={styles.input}
							placeholder="Email"
							keyboardType="email-address"
							value={profile.email}
							onChangeText={(t) => setProfile((p) => ({ ...p, email: t }))}
						/>
						<TextInput
							style={styles.input}
							placeholder="Phone"
							keyboardType="phone-pad"
							value={profile.phone_number}
							onChangeText={(t) => setProfile((p) => ({ ...p, phone_number: t }))}
						/>
						<TextInput
							style={styles.input}
							placeholder="Profile Image URL"
							value={profile.profile_image_url}
							onChangeText={(t) => setProfile((p) => ({ ...p, profile_image_url: t }))}
						/>
						<View style={styles.row}>
							<TouchableOpacity style={[styles.secondaryButton, { flex: 1, marginRight: 8 }]} onPress={() => setEditMode(false)}>
								<Text style={styles.secondaryButtonText}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.primaryButton, { flex: 1, marginLeft: 8 }]} onPress={onSaveProfile} disabled={saving}>
								<Text style={styles.primaryButtonText}>{saving ? 'Saving...' : 'Save Changes'}</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>

			<View style={styles.card}>
				<Text style={styles.cardTitle}>Security</Text>
				<TextInput
					style={styles.input}
					placeholder="Current Password"
					secureTextEntry
					value={currentPassword}
					onChangeText={setCurrentPassword}
				/>
				<TextInput
					style={styles.input}
					placeholder="New Password"
					secureTextEntry
					value={newPassword}
					onChangeText={setNewPassword}
				/>
				<TextInput
					style={styles.input}
					placeholder="Confirm New Password"
					secureTextEntry
					value={confirmNewPassword}
					onChangeText={setConfirmNewPassword}
				/>
				<TouchableOpacity style={styles.primaryButton} onPress={onChangePassword} disabled={changingPwd}>
					<Text style={styles.primaryButtonText}>{changingPwd ? 'Updating...' : 'Change Password'}</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.card}>
				<Text style={styles.cardTitle}>Preferences</Text>
				<View style={styles.rowBetween}>
					<Text style={styles.preferenceText}>Push Notifications</Text>
					<Switch value={profile.notifications_enabled} onValueChange={onToggleNotifications} />
				</View>
				<View style={styles.rowBetween}>
					<Text style={styles.preferenceText}>Theme</Text>
					<View style={styles.row}>
						<TouchableOpacity
							style={[styles.toggleButton, theme === 'light' && styles.toggleButtonActive]}
							onPress={() => saveTheme('light')}
						>
							<Text style={[styles.toggleButtonText, theme === 'light' && styles.toggleButtonTextActive]}>Light</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.toggleButton, theme === 'dark' && styles.toggleButtonActive]}
							onPress={() => saveTheme('dark')}
						>
							<Text style={[styles.toggleButtonText, theme === 'dark' && styles.toggleButtonTextActive]}>Dark</Text>
						</TouchableOpacity>
					</View>
				</View>

			<View style={styles.card}>
				<TouchableOpacity style={styles.secondaryButton} onPress={goToTransactions}>
					<Text style={styles.secondaryButtonText}>View Transaction History</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.secondaryButton, { marginTop: 12 }]} onPress={logout}>
					<Text style={[styles.secondaryButtonText, { color: '#D00' }]}>Logout</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		paddingBottom: 32,
		backgroundColor: '#fff',
	},
	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	profileCard: {
		backgroundColor: '#f7f7f8',
		borderRadius: 12,
		padding: 16,
		alignItems: 'center',
		marginBottom: 16,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginBottom: 12,
		backgroundColor: '#e5e5e5',
	},
	name: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 4,
	},
	email: {
		fontSize: 14,
		color: '#666',
		marginBottom: 12,
	},
	editButton: {
		backgroundColor: '#0a84ff',
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 8,
	},
	editButtonText: {
		color: 'white',
		fontWeight: '600',
	},
	card: {
		backgroundColor: '#f7f7f8',
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 12,
	},
	input: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#e5e5e5',
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		marginBottom: 12,
		fontSize: 14,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rowBetween: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	primaryButton: {
		backgroundColor: '#0a84ff',
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	primaryButtonText: {
		color: 'white',
		fontWeight: '600',
	},
	secondaryButton: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#e5e5e5',
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	secondaryButtonText: {
		color: '#111',
		fontWeight: '600',
	},
	preferenceText: {
		fontSize: 14,
		color: '#111',
	},
	toggleButton: {
		borderWidth: 1,
		borderColor: '#e5e5e5',
		borderRadius: 8,
		paddingVertical: 6,
		paddingHorizontal: 12,
		marginLeft: 8,
		backgroundColor: 'white',
	},
	toggleButtonActive: {
		backgroundColor: '#0a84ff',
		borderColor: '#0a84ff',
	},
	toggleButtonText: {
		color: '#111',
		fontWeight: '600',
	},
	toggleButtonTextActive: {
		color: 'white',
	},
});

export default SettingsPage;
