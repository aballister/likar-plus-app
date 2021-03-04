import styled from 'styled-components';

export const SearchBarView = styled.View`
    height: ${props => `${props.headerHeight}px`};
    padding-top: ${props => `${props.headerTop + 4}px`};
    padding-bottom: 5px;
    background-color: ${props => props.theme.colors.primary};
    padding-horizontal: 5px;
`;

export default SearchBarView;