import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TopNavBar() {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.headerContainer,
            { paddingTop: insets.top + 12 }
        ]}>
            <View style={styles.brandGroup}>
                <Image source={require('@/assets/images/logo_nudge.png')} style={styles.brandIcon} />
            </View>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => console.log('Profile Pressed')}
                style={styles.profileButton}>
                    <Ionicons name="person-outline" size={30} color="#ffffff" />
                </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#142140',
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    brandGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandIcon: {
        width: 55,
        height: 55,
        marginRight: 8,
    },
    brandName: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    profileButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#37425c',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
