import React from 'react';
// import Button from 'components/Buttons';
import Emoji from 'components/Emoji';
import * as S from './style';
interface MyProps {
  children: JSX.Element;
}
type MyState = { error: string | null; errorInfo: string | null };

class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo): void {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render(): JSX.Element {
    if (this.state.errorInfo) {
      // Error path
      return (
        <S.MainContainer>
          <S.SecondaryContainer>
            <S.TextContainer>
              <S.GradientText>Ooops!</S.GradientText>
              <Emoji symbol="😯" size="56px" />
            </S.TextContainer>
            <S.MainText>Something went wrong.</S.MainText>
            <S.DescriptionText>
              Please refresh your browser and try again.
            </S.DescriptionText>
            <S.SButton onClick={() => window.location.reload()} color="white">
              <span>Go Back</span>
            </S.SButton>

            <S.Link href="https://support.suku.world/infinite/what-happens-if-i-see-an-error-message">
              Learn More
            </S.Link>
          </S.SecondaryContainer>
        </S.MainContainer>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
