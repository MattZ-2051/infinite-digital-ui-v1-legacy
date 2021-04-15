import styled from "styled-components";

export interface NavBarMenuProps {
    
}
 
const NavBarMenu: React.FC<NavBarMenuProps> = () => {
    return (
        <Container>
            <ul>
                <li>Uno</li>
                <li>Dos</li>
                <li>Tres</li>
            </ul>
        </Container>
    );
}

const Container = styled.div`
    background-color: black;
    color: white;
`;
 
export default NavBarMenu;