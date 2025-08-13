// styles/styles.js
import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B3D91',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  page: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F9FC',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },

  // Buttons
  primaryButton: {
    backgroundColor: '#FFD600',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  primaryButtonText: {
    color: '#0B3D91',
    fontWeight: '700',
    fontSize: 16,
  },
  ghostButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ffffff66',
  },
  ghostButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  // small variants
  primaryButtonSmall: {
    backgroundColor: '#0B3D91',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  primaryButtonTextSmall: {
    color: '#fff',
    fontWeight: '700',
  },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  inputSmall: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },

  // page cards
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  small: {
    fontSize: 12,
    color: '#666',
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
  },

  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  metricBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginRight: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  listItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  iconButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#edf2ff',
  },
  iconButtonText: {
    color: '#0B3D91',
    fontWeight: '700',
  },
});
