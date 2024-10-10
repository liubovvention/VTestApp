import * as React from 'react';
import {UnistylesRuntime, useStyles} from 'react-native-unistyles';
import {
  Box,
  ResponsiveProp,
  Row,
  RowProps,
  Rows,
  RowsProps,
  useResponsiveProp,
  useSpacingHelpers,
} from '@grapp/stacks';
import globalStyles from 'styles/globalStyles';

type ContextProps = {
  readonly paddingX: number;
};

type Props = React.PropsWithChildren<Omit<RowProps, 'paddingX'>>;

type ScreenProps = Omit<RowsProps, 'paddingTop' | 'paddingBottom'> & {
  readonly topInset?: ResponsiveProp<number>;
  readonly bottomInset?: ResponsiveProp<number>;
};

const Context = React.createContext<ContextProps>({
  paddingX: 4,
});

const useScreen = () => {
  return React.useContext(Context);
};

const Screen = (props: ScreenProps) => {
  const {children, paddingX = 4, topInset, bottomInset, ...rest} = props;

  const {divide} = useSpacingHelpers();

  const resolveResponsiveProp = useResponsiveProp();
  const paddingTop =
    resolveResponsiveProp(topInset) ?? divide(UnistylesRuntime.insets.top);
  const paddingBottom =
    resolveResponsiveProp(bottomInset) ?? divide(UnistylesRuntime.insets.bottom);

  return (
    <Context.Provider value={{paddingX: resolveResponsiveProp(paddingX)}}>
      <Rows
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        {...rest}>
        {children}
      </Rows>
    </Context.Provider>
  );
};

const ContentComponent: React.FC<Props> = (props) => {
  const {paddingX} = useScreen();
  const {styles} = useStyles(globalStyles);
  return <Box paddingX={paddingX} style={styles.screen} {...props} />;
};

const Content = Row.from(ContentComponent);

Screen.Content = Content;

export default Screen;
