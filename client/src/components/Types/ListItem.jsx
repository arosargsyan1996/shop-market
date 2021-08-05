import { PropTypes } from 'prop-types';

const ListItem = ( { id, name } ) => (
    <div>
        <span>{ id }</span>
        <span>{ name }</span>
    </div>
        
)

ListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}

export default ListItem;