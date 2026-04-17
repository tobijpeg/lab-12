import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    useWindowDimensions,
    TouchableOpacity,
    Platform,
    StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ResponsiveHeaderProps {
    title: string;
    leftAction?: {
        icon: string;
        onPress: () => void;
    };
    rightAction?: {
        icon: string;
        onPress: () => void;
    };
}

export function ResponsiveHeader({
    title,
    leftAction,
    rightAction,
}: ResponsiveHeaderProps) {
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();

    const isTablet = width >= 768;
    const isLandscape = width > height;

    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: 0 }]}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#0066cc"
                translucent={Platform.OS === 'android'}
            />

            <View
                style={[
                    styles.header,
                    {
                        paddingTop: Platform.OS === 'android' ? insets.top : 0,
                        height: 56 + (Platform.OS === 'android' ? insets.top : 0),
                    },
                ]}
            >
                <View style={styles.headerContent}>
                    <View style={styles.headerLeft}>
                        {leftAction ? (
                            <TouchableOpacity
                                style={styles.headerButton}
                                onPress={leftAction.onPress}
                            >
                                <Text style={styles.headerIcon}>{leftAction.icon}</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>

                    <View style={styles.headerCenter}>
                        <Text
                            style={[
                                styles.headerTitle,
                                isTablet && styles.headerTitleTablet,
                                isLandscape && styles.headerTitleLandscape,
                            ]}
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                    </View>

                    <View style={styles.headerRight}>
                        {rightAction ? (
                            <TouchableOpacity
                                style={styles.headerButton}
                                onPress={rightAction.onPress}
                            >
                                <Text style={styles.headerIcon}>{rightAction.icon}</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

interface ResponsiveContainerProps {
    children: React.ReactNode;
}

export function ResponsiveContainer({ children }: ResponsiveContainerProps) {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;

    return (
        <View style={[styles.container, { paddingTop: insets.top + 56 }]}>
            {isTablet ? (
                <View style={styles.tabletContainer}>
                    <View style={styles.tabletSidebar}>
                        <Text style={styles.tabletSidebarText}>Navigation</Text>
                    </View>
                    <View style={styles.tabletContent}>{children}</View>
                </View>
            ) : (
                children
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#0066cc',
    },
    header: {
        backgroundColor: '#0066cc',
        borderBottomWidth: 0,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        height: 56,
    },
    headerLeft: {
        width: 48,
        alignItems: 'flex-start',
    },
    headerCenter: {
        flex: 1,
        alignItems: 'center',
    },
    headerRight: {
        width: 48,
        alignItems: 'flex-end',
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.12)',
    },
    headerIcon: {
        fontSize: 20,
        color: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    headerTitleTablet: {
        fontSize: 22,
    },
    headerTitleLandscape: {
        fontSize: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    tabletContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    tabletSidebar: {
        width: 250,
        backgroundColor: '#ffffff',
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0',
        paddingTop: 20,
        alignItems: 'center',
    },
    tabletSidebarText: {
        fontSize: 16,
        color: '#666',
    },
    tabletContent: {
        flex: 1,
        padding: 20,
    },
});