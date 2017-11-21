/* eslint-disable import/default */

import { storiesOf } from 'dev-novel';
import instantsearchPlacesWidget from 'places.js/instantsearchWidget';
import instantsearch from '../../../index.js';
import wrapWithHits from '../wrap-with-hits.js';
import './geo-search-leaflet.css';

const wrapWithHitsAndConfiguration = story =>
  wrapWithHits(story, {
    indexName: 'airbnb',
    searchParameters: {
      hitsPerPage: 50,
    },
  });

export default () => {
  const Stories = storiesOf('GeoSearch (Leaflet)');
  const radius = 5000;
  const precision = 2500;

  const position = {
    lat: 37.7749,
    lng: -122.4194,
  };

  const paddingBoundingBox = {
    top: 41,
    right: 13,
    bottom: 5,
    left: 13,
  };

  // With IP
  Stories.add(
    'with IP',
    wrapWithHitsAndConfiguration(container => {
      window.search.addWidget(
        instantsearch.widgets.geoSearchWithLeaflet({
          container,
          paddingBoundingBox,
        })
      );
    })
  )
    .add(
      'with IP & radius',
      wrapWithHitsAndConfiguration(container => {
        window.search.addWidget(
          instantsearch.widgets.geoSearchWithLeaflet({
            container,
            paddingBoundingBox,
            radius,
          })
        );
      })
    )
    .add(
      'with IP & radius & precision',
      wrapWithHitsAndConfiguration(container => {
        window.search.addWidget(
          instantsearch.widgets.geoSearchWithLeaflet({
            container,
            paddingBoundingBox,
            radius,
            precision,
          })
        );
      })
    );

  // With position
  Stories.add(
    'with position',
    wrapWithHitsAndConfiguration(container => {
      window.search.addWidget(
        instantsearch.widgets.geoSearchWithLeaflet({
          container,
          paddingBoundingBox,
          position,
        })
      );
    })
  )
    .add(
      'with position & radius',
      wrapWithHitsAndConfiguration(container => {
        window.search.addWidget(
          instantsearch.widgets.geoSearchWithLeaflet({
            container,
            paddingBoundingBox,
            radius,
            position,
          })
        );
      })
    )
    .add(
      'with position & radius & precision',
      wrapWithHitsAndConfiguration(container => {
        window.search.addWidget(
          instantsearch.widgets.geoSearchWithLeaflet({
            container,
            paddingBoundingBox,
            radius,
            precision,
            position,
          })
        );
      })
    );

  // With Places
  Stories.add(
    'with position from Places',
    wrapWithHitsAndConfiguration(container => {
      const placesElemeent = document.createElement('input');
      const mapElement = document.createElement('div');

      container.appendChild(placesElemeent);
      container.appendChild(mapElement);

      window.search.addWidget(
        instantsearchPlacesWidget({
          container: placesElemeent,
          defaultPosition: [37.7749, -122.4194],
        })
      );

      window.search.addWidget(
        instantsearch.widgets.geoSearchWithLeaflet({
          container: mapElement,
          radius: 20000,
          enableGeolocationWithIP: false,
          paddingBoundingBox,
        })
      );
    })
  );

  // Only UI
  Stories.add(
    'with control & refine on map move',
    wrapWithHitsAndConfiguration(container => {
      window.search.addWidget(
        instantsearch.widgets.geoSearchWithLeaflet({
          container,
          paddingBoundingBox,
          enableRefineControl: true,
          enableRefineOnMapMove: true,
        })
      );
    })
  )
    .add(
      'with control & disable refine on map move',
      wrapWithHitsAndConfiguration(container => {
        window.search.addWidget(
          instantsearch.widgets.geoSearchWithLeaflet({
            container,
            paddingBoundingBox,
            enableRefineControl: true,
            enableRefineOnMapMove: false,
          })
        );
      })
    )
    .add(
      'without control & refine on map move',
      wrapWithHitsAndConfiguration(container => {
        window.search.addWidget(
          instantsearch.widgets.geoSearchWithLeaflet({
            container,
            paddingBoundingBox,
            enableRefineControl: false,
            enableRefineOnMapMove: true,
          })
        );
      })
    )
    .add(
      'without control & disable refine on map move',
      wrapWithHitsAndConfiguration(container => {
        window.search.addWidget(
          instantsearch.widgets.geoSearchWithLeaflet({
            container,
            paddingBoundingBox,
            enableRefineControl: false,
            enableRefineOnMapMove: false,
          })
        );
      })
    );
};