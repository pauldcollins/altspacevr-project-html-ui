import React from 'react';
import SpaceViewItem from './ViewSpaceItem'

/**
 * @description container for individual view space items
 * @param spaces {array} contains all available spaces
 * @param handleDelete {function} passed into handle deleting of each space  */

const SpacesViewList = ({spaces, handleDelete}) => {
  return (
    <section className="view-spaces row">
      {spaces.map(space =>
        <SpaceViewItem
          {...space}
          key={space.id}
          handleDelete={handleDelete}/>
      )}
    </section>
  )
};

// validate component input
SpacesViewList.propTypes = {
  spaces: React.PropTypes.array.isRequired,
  handleDelete: React.PropTypes.func.isRequired
};

export default SpacesViewList
