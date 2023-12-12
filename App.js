import React, { useRef, useState } from 'react';
import { Animated, Easing, Pressable } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const Box = styled.View`
    background-color: tomato;
    width: 200px;
    height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
    const [up, setUp] = useState(false);
    const position = useRef(new Animated.ValueXY({ x: 0, y: 300 })).current;
    const toggleUp = () => setUp((prev) => !prev);
    const moveUp = () => {
        Animated.timing(position, {
            toValue: up ? 300 : -300,
            useNativeDriver: true,
            duration: 1000,
        }).start(toggleUp);
    };
    const rotation = position.y.interpolate({
        inputRange: [-300, 300],
        outputRange: ['-360deg', '360deg'],
    });
    const borderRadius = position.y.interpolate({
        inputRange: [-300, 300],
        outputRange: [100, 0],
    });
    const bgColor = position.y.interpolate({
        inputRange: [-300, 300],
        outputRange: ['rgb(255, 99, 71)', 'rgb(71, 166, 255)'],
    });

    return (
        <Container>
            <Pressable onPress={moveUp}>
                <AnimatedBox
                    style={{
                        borderRadius,
                        backgroundColor: bgColor,
                        transform: [{ rotateY: rotation }, { translateY: position.y }],
                    }}
                />
            </Pressable>
        </Container>
    );
}
