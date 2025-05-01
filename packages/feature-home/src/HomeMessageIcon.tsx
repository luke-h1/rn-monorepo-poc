import { ComponentProps } from 'react';
import { Text } from 'react-native';

type HomeMessageIconProps = ComponentProps<typeof Text>;

export const HomeMessageIcon = ({ style, ...props }: HomeMessageIconProps) => (
  <Text style={[{ fontSize: 28 }, style]} {...props}>
    👋
  </Text>
);
