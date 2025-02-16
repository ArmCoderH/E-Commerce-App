import {
    createNavigationContainerRef,
    CommonActions,
    StackActions
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.navigate({
                name: routeName,
                params,
            })
        );
    }
}

export function replace(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            StackActions.replace(routeName, params)
        );
    }
}

export function resetAndNavigate(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: routeName, params }],
            })
        );
    }
}

export function goBack() {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.goBack());
    }
}