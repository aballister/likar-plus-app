import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppTouchable from '../AppTouchable';
import { translate } from '../../locale';
import {
    ListItemLabelView,
    ListItemRowView, ListItemSubtitleView,
    ListItemTitleText,
    ListItemView,
} from './ListItem.style';

export default function ListItem(props) {
    const {
        item, title, subTitle, fields, routeTo,
    } = props;

    const navigation = useNavigation();
    const ContainerView = routeTo ? AppTouchable : View;
    const excludeFields = ['id', ...title, ...subTitle];
    const fieldsToRender = fields ?? Object.keys(item)
        .filter(field => !excludeFields.includes(field));

    function navigateTo() {
        if (routeTo) {
            navigation.navigate(routeTo, { item });
        }
    }

    return (
        <ContainerView onPress={navigateTo}>
            <ListItemView>
                {
                    subTitle.length > 0 &&
                    <ListItemSubtitleView>
                        {
                            subTitle.map((field, index) => (
                                <Text key={`subtitle-${index}`}>
                                    {`${translate(`form.${field}`)}: ${item[field]}`}
                                </Text>
                            ))
                        }
                    </ListItemSubtitleView>
                }
                <ListItemTitleText>
                    {title.map(field => item[field]).join(' ')}
                </ListItemTitleText>
                {
                    fieldsToRender.map(field => (
                        <ListItemRowView key={field}>
                            <ListItemLabelView>
                                <Text>
                                    {translate(`form.${field}`)}
                                    :
                                </Text>
                            </ListItemLabelView>
                            <Text>
                                {item[field]}
                            </Text>
                        </ListItemRowView>
                    ))
                }
            </ListItemView>
        </ContainerView>
    );
}

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
    title: PropTypes.arrayOf(PropTypes.string).isRequired,
    fields: PropTypes.arrayOf(PropTypes.string),
    routeTo: PropTypes.string,
    subTitle: PropTypes.arrayOf(PropTypes.string),
};

ListItem.defaultProps = {
    fields: undefined,
    routeTo: '',
    subTitle: [],
};