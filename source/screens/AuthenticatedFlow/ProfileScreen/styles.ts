import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.typography.dark_gray,
    marginBottom: 16,
    marginTop: 8,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.typography.gray,
    textAlign: "center",
    marginTop: 32,
  },
  donationCard: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.typography.dark_gray,
    marginBottom: 4,
  },
  donationValue: {
    fontSize: 16,
    color: theme.colors.primary,
    marginBottom: 2,
  },
  donationDate: {
    fontSize: 14,
    color: theme.colors.typography.gray,
  },
}));
