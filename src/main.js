// this is the base-config for resource-finder
// the point of this file is that it will move outside the project
// (so that settings we put in it can be used by other projects)
// and be pulled in with an axios call or something
// (we might not need to use axios with new vue async tools)
// if that is not needed, we can move this info to main.js

// turn off console logging in production
if (process.env.NODE_ENV === 'production') {
  console.log = console.info = console.debug = console.error = function () {};
}
// console.log('main.js process.env.NODE_ENV:', process.env.NODE_ENV, 'process.env.VUE_APP_PUBLICPATH:', process.env.VUE_APP_PUBLICPATH);

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown as farAngleDown } from '@fortawesome/pro-regular-svg-icons/faAngleDown';
import { faAngleUp as farAngleUp } from '@fortawesome/pro-regular-svg-icons/faAngleUp';
import { faTimes as farTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';
import { faPlus as farPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import { faMinus as farMinus } from '@fortawesome/pro-regular-svg-icons/faMinus';
import { faCheck } from '@fortawesome/pro-regular-svg-icons/faCheck';
import { faCarBus } from '@fortawesome/pro-solid-svg-icons/faCarBus';

library.add(farAngleDown, farAngleUp, farTimes, farPlus, farMinus, faCheck, faCarBus);

import './assets/scss/main.scss';

// import pinboard
import pinboard from '@phila/pinboard/src/main.js';

// data-sources
import ost from './data-sources/ost';

import expandCollapseContent from './components/ExpandCollapseContent.vue';
import customGreeting from './components/customGreeting.vue';
const customComps = {
  'expandCollapseContent': expandCollapseContent,
  'customGreeting': customGreeting,
};

import i18n from './i18n/i18n';
console.log('main.js i18n:', i18n);

import { format, parseISO, parse } from 'date-fns';

pinboard({
  publicPath: process.env.VUE_APP_PUBLICPATH,
  i18n: i18n.i18n,
  app: {
    type: 'ost',
    logoSrc: require('@/assets/city-of-phila-beta.png'),
    logoLink: 'none',
    // logoWidth: 50,
    logoAlt: 'City of Philadelphia',
  },
  gtag: {
    category: 'rf-ost',
  },
  // anySearch: true,
  allowZipcodeSearch: true,
  allowPrint: true,
  showBuffers: true,
  resetDataOnGeocode: true,
  retractableRefine: true,
  dropdownRefine: false,
  searchBar: {
    searchTypes: [
      'address',
      'zipcode',
      'keyword',
    ],
    searchDistance: 3,
    fuseThreshold: 0.45,
  },
  tags: {
    type: 'fieldValues',
    tags: [
      {
        type: 'value',
        field: 'ProgramLocatorActivityName',
      },
      {
        type: 'value',
        field: 'school',
      },
    ],
  },
  locationInfo: {
    siteName: function(item) {
      return item.attributes.ProgramLocatorActivityName;
      // return item.attributes.servicename;
      // return item.attributes.programname;
    },
  },
  customComps,
  hiddenRefine: {
    SchoolYearOrSummer(item) {
      // return item.attributes.SchoolYearOrSummer != 'School Year' && item.attributes.isInPublicProgramDirectory == "1";
      return item.attributes.ProgramLocatorActivityName !== ''
        && item.attributes.ProgramLocatorActivityName !== null
        && item.attributes.isInPublicProgramDirectory == "1";
    },
  },
  //   START_DATE: function(item) {
  //     // let today = format(new Date(), 'MM/dd/yyyy');
  //     let today = Date.parse(new Date());
  //     let test = parse('January');
  //     console.log('today:', today, 'item.attributes.START_DATE:', item.attributes.START_DATE.replace(',', '').replace('nd', '').replace('rd', '').replace('th', ''), 'item.attributes.END_DATE:', item.attributes.END_DATE.replace(',', '').replace('nd', '').replace('rd', '').replace('th', ''));
  //     let startDate, endDate;
  //     if (typeof item.attributes.START_DATE === 'string') {
  //       startDate = Date.parse(item.attributes.START_DATE.replace(',', '').replace('nd', '').replace('rd', '').replace('th', ''));
  //       // startDate = format(parseISO(item.attributes.START_DATE.replace(',', '').replace('nd', '').replace('rd', '').replace('th', '')), 'MM/dd/yyyy');
  //     } else {
  //       startDate = format(item.attributes.START_DATE, 'MM/dd/yyyy');
  //     }
  //
  //     if (typeof item.attributes.END_DATE === 'string') {
  //       endDate = Date.parse(item.attributes.END_DATE.replace(',', '').replace('nd', '').replace('rd', '').replace('th', ''));
  //       // endDate = format(parseISO(item.attributes.END_DATE.replace(',', '').replace('nd', '').replace('rd', '').replace('th', '')), 'MM/dd/yyyy');
  //     } else {
  //       endDate = format(item.attributes.END_DATE, 'MM/dd/yyyy');
  //     }
  //
  //     console.log('today:', today, 'startDate:', startDate, 'endDate:', endDate);
  //
  //     return true;
  //   },
  // },
  refine: {
    type: 'multipleFieldGroups',
    columns: true,
    multipleFieldGroups: {
      term: {
        columns: 1,
        checkbox: {
          'summer': {
            unique_key: 'term_summer',
            i18n_key: 'term.summer',
            value: function(item) {
              return item.attributes.SchoolYearOrSummer === 'Summer';
            },
          },
          'schoolYear': {
            unique_key: 'term_schoolYear',
            i18n_key: 'term.schoolYear',
            value: function(item) {
              return item.attributes.SchoolYearOrSummer === 'School Year';
            },
          },
        },
      },
      achieversAndC2L: {
        columns: 1,
        checkbox: {
          'isAchievers': {
            unique_key: 'achieversAndC2L_isAchievers',
            i18n_key: 'achieversAndC2L.isAchievers',
            value: function(item) {
              return item.attributes.isAcademicAchievers != null;
            },
          },
          'isC2L': {
            unique_key: 'achieversAndC2L_isC2L',
            i18n_key: 'achieversAndC2L.isC2L',
            value: function(item) {
              return item.attributes.isCareerConnected != null;
            },
          },
        },
      },
      registration: {
        columns: 1,
        checkbox: {
          'open': {
            unique_key: 'registration_open',
            i18n_key: 'registration.open',
            value: function(item) {
              let value;
              if (item.attributes.RegistrationPeriodEndDate != null) {
                // console.log('new Date():', new Date(), 'new Date(item.attributes.RegistrationPeriodEndDate):', new Date(item.attributes.RegistrationPeriodEndDate));
                value = new Date() < new Date(item.attributes.RegistrationPeriodEndDate);
              } else {
                value = false;
              }
              return value;
            },
          },
          'required': {
            unique_key: 'registration_required',
            i18n_key: 'registration.required',
            value: function(item) {
              let value;
              if (item.attributes.REGISTRATION) {
                value = item.attributes.REGISTRATION.split(', ').includes('Registration required');
              } else {
                value = false;
              }
              return value;
            },
          },
          'dropIn': {
            unique_key: 'registration_dropIn',
            i18n_key: 'registration.dropIn',
            value: function(item) {
              let value;
              if (item.attributes.REGISTRATION) {
                console.log("item.attributes.REGISTRATION.split(', '):", item.attributes.REGISTRATION.split(', '));
                value = item.attributes.REGISTRATION.split(', ').includes('Drop-in');
              } else {
                value = false;
              }
              return value;
            },
          },
          'other': {
            unique_key: 'registration_other',
            i18n_key: 'registration.other',
            value: function(item) {
              let value;
              if (item.attributes.REGISTRATION) {
                // console.log("item.attributes.REGISTRATION.split(', '):", item.attributes.REGISTRATION.split(', '));
                value = item.attributes.REGISTRATION.split(', ').includes('Other');
              } else {
                value = false;
              }
              return value;
            },
          },
          'students': {
            unique_key: 'registration_students',
            i18n_key: 'registration.students',
            value: function(item) {
              let value;
              if (item.attributes.REGISTRATION) {
                // console.log("item.attributes.REGISTRATION.split(', '):", item.attributes.REGISTRATION.split(', '));
                value = item.attributes.REGISTRATION.split(', ').includes('Program only open to students attending this school');
              } else {
                value = false;
              }
              return value;
            },
          },
        },
      },
      age: {
        columns: 1,
        checkbox: {
          'isUnder5': {
            unique_key: 'age_isUnder5',
            i18n_key: 'age.isUnder5',
            value: function(item) {
              return item.attributes.isUnder5 != null;
            },
          },
          'is5to10': {
            unique_key: 'age_is5to10',
            i18n_key: 'age.is5to10',
            value: function(item) {
              return item.attributes.is5to10 != null;
            },
          },
          'is11to13': {
            unique_key: 'age_is11to13',
            i18n_key: 'age.is11to13',
            value: function(item) {
              return item.attributes.is11to13 != null;
            },
          },
          'is14to18': {
            unique_key: 'age_is14to18',
            i18n_key: 'age.is14to18',
            value: function(item) {
              return item.attributes.is14to18 != null;
            },
          },
          'isAbove18': {
            unique_key: 'age_isAbove18',
            i18n_key: 'age.isAbove18',
            value: function(item) {
              return item.attributes.isAbove18 != null;
            },
          },
        },
      },
      grade: {
        columns: 1,
        checkbox: {
          'serviceGradeLevelPreK': {
            unique_key: 'grade_serviceGradeLevelPreK',
            i18n_key: 'grade.serviceGradeLevelPreK',
            value: function(item) {
              return item.attributes.serviceGradeLevelPreK != null;
            },
          },
          'serviceGradeLevelK5': {
            unique_key: 'grade_serviceGradeLevelK5',
            i18n_key: 'grade.serviceGradeLevelK5',
            value: function(item) {
              return item.attributes.serviceGradeLevelK != null
              || item.attributes.serviceGradeLevel1 != null
              || item.attributes.serviceGradeLevel2 != null
              || item.attributes.serviceGradeLevel3 != null
              || item.attributes.serviceGradeLevel4 != null
              || item.attributes.serviceGradeLevel5 != null;
            },
          },
          'serviceGradeLevel68': {
            unique_key: 'grade_serviceGradeLevel68',
            i18n_key: 'grade.serviceGradeLevel68',
            value: function(item) {
              return item.attributes.serviceGradeLevel6 != null
              || item.attributes.serviceGradeLevel7 != null
              || item.attributes.serviceGradeLevel8 != null;
            },
          },
          'serviceGradeLevel912': {
            unique_key: 'grade_serviceGradeLevel912',
            i18n_key: 'grade.serviceGradeLevel912',
            value: function(item) {
              return item.attributes.serviceGradeLevel9 != null
              || item.attributes.serviceGradeLevel10 != null
              || item.attributes.serviceGradeLevel11 != null
              || item.attributes.serviceGradeLevel12 != null;
            },
          },
        },
      },
      focusArea: {
        columns: 1,
        checkbox: {
          'isAcademic': {
            unique_key: 'focusArea_isAcademic',
            i18n_key: 'focusArea.isAcademic',
            value: function(item) {
              return item.attributes.isAcademic != null;
            },
          },
          'isArt': {
            unique_key: 'focusArea_isArt',
            i18n_key: 'focusArea.isArt',
            value: function(item) {
              return item.attributes.isArt != null;
            },
          },
          'isCharacterDevelopment': {
            unique_key: 'focusArea_isCharacterDevelopment',
            i18n_key: 'focusArea.isCharacterDevelopment',
            value: function(item) {
              return item.attributes.isCharacterDevelopment != null;
            },
          },
          'isCollegeCareer': {
            unique_key: 'focusArea_isCollegeCareer',
            i18n_key: 'focusArea.isCollegeCareer',
            value: function(item) {
              return item.attributes.isCollegeCareer != null;
            },
          },
          'isCommunityService': {
            unique_key: 'focusArea_isCommunityService',
            i18n_key: 'focusArea.isCommunityService',
            value: function(item) {
              return item.attributes.isCommunityService != null;
            },
          },
          'isHealth': {
            unique_key: 'focusArea_isHealth',
            i18n_key: 'focusArea.isHealth',
            value: function(item) {
              return item.attributes.isHealth != null;
            },
          },
          'isSTEM': {
            unique_key: 'focusArea_isSTEM',
            i18n_key: 'focusArea.isSTEM',
            value: function(item) {
              return item.attributes.isSTEM != null;
            },
          },
        },
      },
      daysOffered: {
        columns: 1,
        checkbox: {
          'monday': {
            unique_key: 'daysOffered_monday',
            i18n_key: 'daysOffered.monday',
            value: function(item) {
              return item.attributes.daynames.split(', ').includes('M');
            },
          },
          'tuesday': {
            unique_key: 'daysOffered_tuesday',
            i18n_key: 'daysOffered.tuesday',
            value: function(item) {
              return item.attributes.daynames.split(', ').includes('Tu');
            },
          },
          'wednesday': {
            unique_key: 'daysOffered_wednesday',
            i18n_key: 'daysOffered.wednesday',
            value: function(item) {
              return item.attributes.daynames.split(', ').includes('W');
            },
          },
          'thursday': {
            unique_key: 'daysOffered_thursday',
            i18n_key: 'daysOffered.thursday',
            value: function(item) {
              return item.attributes.daynames.split(', ').includes('Th');
            },
          },
          'friday': {
            unique_key: 'daysOffered_friday',
            i18n_key: 'daysOffered.friday',
            value: function(item) {
              return item.attributes.daynames.split(', ').includes('F');
            },
          },
          'saturday': {
            unique_key: 'daysOffered_saturday',
            i18n_key: 'daysOffered.saturday',
            value: function(item) {
              return item.attributes.daynames.split(', ').includes('Sa');
            },
          },
          'sunday': {
            unique_key: 'daysOffered_sunday',
            i18n_key: 'daysOffered.sunday',
            value: function(item) {
              return item.attributes.daynames.split(', ').includes('Su');
            },
          },
        },
      },
      fee: {
        columns: 1, 
        checkbox: {
          'free': {
            unique_key: 'fee_free',
            i18n_key: 'fee.free',
            value: function(item) {
              let value;
              if (item.attributes.COSTS != null) {
                // console.log("item.attributes.COSTS.split(', '):", item.attributes.COSTS.split(', '));
                value = item.attributes.COSTS.split(', ').includes('Free');
              } else {
                value = false;
              }
              return value;
            },
          },
          'ccis': {
            unique_key: 'fee_ccis',
            i18n_key: 'fee.ccis',
            value: function(item) {
              let value;
              if (item.attributes.COSTS != null) {
                value = item.attributes.COSTS.split(', ').includes('CCIS Approved');
              } else {
                value = false;
              }
              return value;
            },
          },
          'feeBased': {
            unique_key: 'fee_feeBased',
            i18n_key: 'fee.feeBased',
            value: function(item) {
              let value;
              if (item.attributes.COSTS != null) {
                value = item.attributes.COSTS.split(', ').includes('Fee based');
              } else {
                value = false;
              }
              return value;
            },
          },
          'scholarships': {
            unique_key: 'fee_scholarships',
            i18n_key: 'fee.scholarships',
            value: function(item) {
              let value;
              if (item.attributes.COSTS != null) {
                value = item.attributes.COSTS.split(', ').includes('Scholarships/Financial Assistance');
              } else {
                value = false;
              }
              return value;
            },
          },
        },
      },
      // transportation: {
      //   columns: 1,
      //   checkbox: {
      //     'noTransportationProvided': {
      //       unique_key: 'transportation_noTransportationProvided',
      //       i18n_key: 'transportation.noTransportationProvided',
      //       value: function(item) {
      //         let value;
      //         if (item.attributes.TRANSPORTATION != null) {
      //           value = item.attributes.TRANSPORTATION.split(', ').includes('No transportation provided');
      //         } else {
      //           value = false;
      //         }
      //         return value;
      //       },
      //     },
      //     'accessible': {
      //       unique_key: 'transportation_accessible',
      //       i18n_key: 'transportation.accessible',
      //       value: function(item) {
      //         let value;
      //         if (item.attributes.TRANSPORTATION != null) {
      //           value = item.attributes.TRANSPORTATION.split(', ').includes('Accessible bus/Subway Stops');
      //         } else {
      //           value = false;
      //         }
      //         return value;
      //       },
      //     },
      //     'toSite': {
      //       unique_key: 'transportation_toSite',
      //       i18n_key: 'transportation.toSite',
      //       value: function(item) {
      //         let value;
      //         if (item.attributes.TRANSPORTATION != null) {
      //           value = item.attributes.TRANSPORTATION.split(', ').includes('Transportation provided to site');
      //         } else {
      //           value = false;
      //         }
      //         return value;
      //       },
      //     },
      //     'fromSite': {
      //       unique_key: 'transportation_fromSite',
      //       i18n_key: 'transportation.fromSite',
      //       value: function(item) {
      //         let value;
      //         if (item.attributes.TRANSPORTATION != null) {
      //           value = item.attributes.TRANSPORTATION.split(', ').includes('Transportation provided from site to home');
      //         } else {
      //           value = false;
      //         }
      //         return value;
      //       },
      //     },
      //   },
      // },
      
    },
  },
  dataSources: {
    ost,
  },
  router: {
    enabled: false,
  },
  projection: '3857',
  geocoder: {
    url(input) {
      const inputEncoded = encodeURIComponent(input);
      return `//api.phila.gov/finder/v1/search/${inputEncoded}`;
    },
    params: {
      include_units: true,
    },
  },
  footer: [
    {
      type: "native",
      href: "https://www.phila.gov/",
      attrs: {
        target: "_blank",
      },
      text: "cityOfPhiladelphia",
    },
    {
      type: "native",
      href: "https://www.phila.gov/ost/program-locator/#/",
      text: "about",
    },
    {
      type: "native",
      href: "https://www.phila.gov/feedback/",
      attrs: {
        target: "_blank",
      },
      text: "feedback",
    },
  ],
  cyclomedia: {
    enabled: false,
  },
  holidays: {},
  markerType: 'circle-marker',
  circleMarkers:{
    color: '#2176d2',
    borderColor: 'white',
    weight: 1,
    radius: 8,
    mobileRadius: 12,
    size: 16,
    mobileSize: 20,
  },
  alerts: {
    modal: {
      enabled: true,
      header: 'Disclaimer',
      body: '<p>The Out-of-School programs (“OST Program(s)”) are not operated, endorsed, or \
        controlled by the City of Philadelphia (“City”). The City is providing this list of \
        programs for your convenience only. If you use any program links, you will leave \
        the City’s website and be directed to a website for that particular OST Program.</p>\
<br>\
        <p>The City provides no warranties, promises, and/or representations of any kind, \
        expressed or implied, as to the nature, standard, or accuracy provided by these OST \
        Programs, nor to the suitability or otherwise information to your particular \
        circumstances. The City does not endorse, approve, or control the information contained \
        in the program websites. The information is provided only on an “as is” and “with all \
        faults” basis.</p>\
<br>\
        <p>By clicking on any external links, you acknowledge that in no event shall the \
        City be liable to you or to any other person or entity for any direct, indirect, \
        special, incidental, or consequential or other damage, cost, or expense arising out \
        of or in relation to the enrollment in these OST Programs or use of any of the OST \
        Programs’ websites.</p>',
      },
  },
  map: {
    type: 'mapbox',
    containerClass: 'map-container',
    defaultBasemap: 'pwd',
    center: [ -75.15, 40 ],
    zoom: 10,
    geocodeZoom: 15,
    imagery: {
      enabled: false,
    },
    basemaps: {
      pwd: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer',
        tiledLayers: [
          'cityBasemapLabels',
        ],
        type: 'featuremap',
        attribution: 'Parcels: Philadelphia Water',
      },
    },
    tiledLayers: {
      cityBasemapLabels: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer',
        zIndex: '3',
      },
    },
  },
  mbStyle: {
    version: 8,
    sources: {
      pwd: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
        ],
        type: 'raster',
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'pwd',
        type: 'raster',
        source: 'pwd',
      },
    ],
  },
  basemapSources: {
    pwd: {
      source: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
          // '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'
        ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'pwd',
        type: 'raster',
      },
    },
    imagery2019: {
      source: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2019_3in/MapServer/tile/{z}/{y}/{x}',
          // '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'
        ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'imagery2019',
        type: 'raster',
      },
    },
  },
  basemapLabelSources:{
    cityBasemapLabels: {
      source: {
        tiles: [ 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}' ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'cityBasemapLabels',
        type: 'raster',
      },
    },
    imageryBasemapLabels: {
      source: {
        tiles: [ 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_Labels/MapServer/tile/{z}/{y}/{x}' ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'imageryBasemapLabels',
        type: 'raster',
      },
    },
  },
});
