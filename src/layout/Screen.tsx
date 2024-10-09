import * as React from 'react';
import {UnistylesRuntime, useStyles} from 'react-native-unistyles';
import {Platform} from 'react-native';
import {
  ResponsiveProp,
  Rows,
  RowsProps,
  useResponsiveProp,
  useSpacingHelpers,
} from '@grapp/stacks';
import globalStyles from 'styles/globalStyles';

type ContextProps = {
  readonly paddingX: number;
};

type ScreenProps = Omit<RowsProps, 'paddingTop' | 'paddingBottom'> & {
  readonly topInset?: ResponsiveProp<number>;
  readonly bottomInset?: ResponsiveProp<number>;
};

const Context = React.createContext<ContextProps>({
  paddingX: 4,
});

const Screen = (props: ScreenProps) => {
  const {children, paddingX = 4, topInset, bottomInset, ...rest} = props;

  const {divide} = useSpacingHelpers();
  const isIOS = Platform.OS === 'ios';

  const resolveResponsiveProp = useResponsiveProp();
  const paddingTop =
    resolveResponsiveProp(topInset) ?? isIOS ? 0 : divide(UnistylesRuntime.insets.top);
  const paddingBottom =
    resolveResponsiveProp(bottomInset) ??
    isIOS ? 0 : divide(UnistylesRuntime.insets.bottom);
  const {styles} = useStyles(globalStyles);

  return (
    <Context.Provider value={{paddingX: resolveResponsiveProp(paddingX)}}>
      <Rows
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        style={styles.screen}
        {...rest}>
        {children}
      </Rows>
    </Context.Provider>
  );
};

export default Screen;
