import * as S from './styles';
import { useRef } from 'react';
import { useEffect } from 'react';

const Intro = () => {
    const video = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        video.current?.play();
        return () => {
            video.current?.pause();
        };
    }, []);

    return (
        <S.Background>
            <S.BgContainer>
                <S.BgImage />
            </S.BgContainer>
            <S.Header>
                <S.HeaderContent>
                    <S.HeaderLeft>
                        <S.Link to="/">
                            <S.Infinite />
                        </S.Link>
                    </S.HeaderLeft>
                    <S.Link to="/marketplace">
                        <S.Button1 style={{ marginLeft: '0.4rem' }}>Go to marketplace</S.Button1>
                    </S.Link>
                </S.HeaderContent>
            </S.Header>
            <S.BodyContainer>
                <S.OnTop>
                    <S.Title>Become an early member of InfiniteWorld</S.Title>
                    <S.SubTitle>We{`'`}re creating the Megaverse!</S.SubTitle>
                    <S.ScreenBG>
                        <S.VideoScreen autoPlay={true} loop={true} ref={video} controls>
                            <source src="https://infinite-digital-prod.s3.amazonaws.com/vip-landing/InfiniteWorld-NYCVIP_VF_F.mp4" type="video/mp4" />
                        </S.VideoScreen>
                    </S.ScreenBG>
                    <S.SubScreen>
                        The InfiniteWorld Megaverse is launching soon with a universe of ways to collect NFTs, engage, play, and earn within a community of peers, brands, creators, artists, musicians, and athletes.
                    </S.SubScreen>
                    <S.SignSection>
                        <S.SignUp>
                            Sign Up now for VIP early access to InfiniteWorld.
                        </S.SignUp>
                        <S.LastText> Stay tuned for upcoming NFT drops, avatar collections, games, and features as they release.   </S.LastText>
                        <S.Button2> Join our megaverse community!</S.Button2>
                    </S.SignSection>
                </S.OnTop>
                <S.Gradient1 />
                <S.Gradient2 />
                <S.Gradient3 />
            </S.BodyContainer>

        </S.Background>
    );
};



export default Intro;
