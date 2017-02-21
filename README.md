This project is a fork from the [AltspaceVR Programming Project] 
(https://github.com/AltspaceVR/altspacevr-project-html-ui)

This project was bootstrapped with [Create React App]
(https://github.com/facebookincubator/create-react-app).


## Installation
To install, first clone the repository then:

```
cd altspacevr-project-html-ui
npm install
npm start
```

The Project can now be browsed at either **http://localhost:3000/** or **http://0.0.0.0:3000/**


## Project requirements
Node 4+
Google Chrome (latest)


## The architecture
This project makes use of the [Presentational and Container components pattern]
(https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

If the project were to grow, I would implement a flux architecture, such as Redux. For now, as it’s small, I’ve followed the recommendations of Redux creator, Dan Abramov, in his article [You might not need Redux] 
(https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

Instead of Flux, I’ve used my own cloning method, (found in the helpers file), to take a complete copy of the state, make changes to it, then replace the old one. This maybe heavier performance wise, but it avoids the big buy in for Redux and will still ensure we avoid mutations.

I’ve modified the original data file to make it ES6 compliant, so I can now import it as an ES6 module.

The project uses Babel for ES6 support.


## Design and animation
The site has been designed to be responsive for different screen sizes. However it has only been tesed on Chrome as per the original project requirements.

The design attempts to leverage the existing AltspaceVR branding, using the ‘Vag-Light’ font and the pastel colours, such as pale green and smoke grey. 

All animation times sit within the maximum recommended 700ms, based on the [Human Processor Model]
(https://en.wikipedia.org/wiki/Human_processor_model)

Currently the view spaces page uses Flexbox. I would want to work out how many spaces there are likely to be on any given page, as one or two would look quite sparse on their own, but if the content was likely to spread vertically by a large amount, I feel the new CSS Grids would be a better solution. They are currently experimental and not supported however I believe they can be turned on in Chromium 😃 


## User Experience
The Add Members UI assumes that there always be a large number of users to choose from, hence the select box, and only a handful of members, which is why they are in an unordered list. Further user research might suggest different and the UI would be modified to cater for the amount of content.

Currently people return to the homepage after editing or creating a space. Based on research, if people would be often editing multiple spaces at the same time, they could click next after editing one or select from a drop down. 


## Accessibility
Where images are used to convey information, such as the remove icon for the member list, hidden screen reader only text is provided.

All form inputs have corresponding labels or legend tags, to ensure screen reader support.
  
  
## Enhancements, Improvements and optimisations
Given more time, there are a TON of things I’d love to add: Here is a non-exhaustive list of ideas:

- Breaking the EditSpacesForm.js file down into more components
- More comprehensive error handling for api calls (IE: promises)
- A number of repeated attempts if the content is offline the first time
- Unit and functional tests
- A constants file for all text, so we could translate later
- Service workers to decrease load times
- Lot’s more SASS usage - mixins and more use of variables
- CSS Modules!
- Design enhancements, more imagery
