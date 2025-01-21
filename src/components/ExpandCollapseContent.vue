<script setup>

const instance = getCurrentInstance();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import { format, parseISO } from 'date-fns';
import { fr, vi, ru, es, enUS, zhCN } from 'date-fns/locale';

const props = defineProps({
  item: {
    type: Object,
    default: function(){
      return {};
    },
  },
});

// computed
const hasFocusAreas = computed(() => {
  return props.item.properties.isArt || props.item.properties.isHealth || props.item.properties.isCharacterDevelopment || props.item.properties.isCommunityService || props.item.properties.isSTEM || props.item.properties.isCareerConnected;
});

const artsAndCulture = computed(() => {
  let value = ' ';
  if (props.item['Arts and Culture']) {
    for (let i=0; i<props.item['Arts and Culture'].length-1; i++) {
      value += props.item['Arts and Culture'][i] + ', ';
    }
    value += props.item['Arts and Culture'][props.item['Arts and Culture'].length-1];
  }
  return value;
});

const health = computed(() => {
  let value = ' ';
  if (props.item['Sports, Health and Wellness Activities']) {
    for (let i=0; i<props.item['Sports, Health and Wellness Activities'].length-1; i++) {
      value += props.item['Sports, Health and Wellness Activities'][i] + ', ';
    }
    value += props.item['Sports, Health and Wellness Activities'][props.item['Sports, Health and Wellness Activities'].length-1];
  }
  return value;
})

const characterDevelopment = computed(() => {
  let value = ' ';
  if (props.item['Character Education/Positive Youth Development']) {
    for (let i=0; i<props.item['Character Education/Positive Youth Development'].length-1; i++) {
      value += props.item['Character Education/Positive Youth Development'][i] + ', ';
    }
    value += props.item['Character Education/Positive Youth Development'][props.item['Character Education/Positive Youth Development'].length-1];
  }
  return value;
});

const communityService = computed(() => {
  let value = ' ';
  if (props.item['Community Service Learning']) {
    for (let i=0; i<props.item['Community Service Learning'].length-1; i++) {
      value += props.item['Community Service Learning'][i] + ', ';
    }
    value += props.item['Community Service Learning'][props.item['Community Service Learning'].length-1];
  }
  return value;
});

const stem = computed(() => {
  let value = ' ';
  if (props.item['STEM/STEAM']) {
    for (let i=0; i<props.item['STEM/STEAM'].length-1; i++) {
      value += props.item['STEM/STEAM'][i] + ', ';
    }
    value += props.item['STEM/STEAM'][props.item['STEM/STEAM'].length-1];
  }
  return value;
});

const collegeCareer = computed(() => {
  let value = ' ';
  if (props.item['College and Career Readiness']) {
    for (let i=0; i<props.item['College and Career Readiness'].length-1; i++) {
      value += props.item['College and Career Readiness'][i] + ', ';
    }
    value += props.item['College and Career Readiness'][props.item['College and Career Readiness'].length-1];
  }
  return value;
});

const showTwitter = computed(() => {
  let value = false;
  let badValues = [ 'N/A', 'n/a', 'na', 'NA', 'Na', 'nA', 'none' ];
  if (props.item.properties.TWITTER && !badValues.includes(props.item.properties.TWITTER)) {
    value = true;
  }
  return value;
});

const i18nLocale = computed(() => {
  return instance.appContext.config.globalProperties.$i18n.locale;
});

const days = computed(() => {
  let columns = [
    {
      label: 'Days',
      i18nLabel: 'daysOfTheWeek',
      field: 'label',
      thClass: 'th-black-class',
      tdClass: 'table-text',
    },
    {
      label: 'Schedule',
      i18nLabel: 'hours',
      field: 'value',
      thClass: 'th-black-class',
      tdClass: 'table-text',
    },
  ];
  // let allDays = [ 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY' ];
  // let allDays = [ 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN' ];
  let allDays = [ 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun' ];
  let rows = [];

  for (let [ index, day ] of allDays.entries()) {
    // console.log('day:', day, 'index:', index);
    let scheduleOrClosed = parseTimeRange(day, props.item['hours_'+day+'_start'], props.item['hours_'+day+'_end']);
    // let scheduleOrClosed = parseTimeRange(day, props.item['hours_'+day+'_start'], props.item['hours_'+day+'_end']);
    if (scheduleOrClosed !== 'Closed') {
      rows.push({
        id: index + 1,
        days: daysKey.value[day],
        schedule: scheduleOrClosed,
      });
    }
  }
  return { columns, rows };
});

const daysKey = computed(() => {
  return {
    'mon': 'Monday',
    'tues': 'Tuesday',
    'wed': 'Wednesday',
    'thurs': 'Thursday',
    'fri': 'Friday',
    'sat': 'Saturday',
    'sun': 'Sunday',
  };
});

// methods
const getAges = (item) => {
  // console.log('getAges is running, item:', item);
  let options = [ 'isUnder5', 'is5to10', 'is11to13', 'is14to18', 'isAbove18' ];
  let finalAges = [];
  for (let option of options) {
    if (item[option] == '1') {
      finalAges.push(t(`age.${option}`));
    }
  }
  return finalAges.join(', ');
};

const getGrades = (item) => {
  // console.log('getGrades is running, item:', item);
  let options = [ 'serviceGradeLevelPreK', 'serviceGradeLevelK', 'serviceGradeLevel6', 'serviceGradeLevel9' ];
  let finalGrades = [];
  for (let option of options) {
    if (item[option] == '1') {
      finalGrades.push(t(`grade.${option}`));
    }
  }
  return finalGrades.join(', ');
};

const datefnsFormat = (date) => {
  // console.log('datefnsFormat is running, date:', date);
  let value;
  if (date) {
    value = format(parseISO(date), 'EEEE, MMM d, yyyy');
  }
  return value;
};

const formatDate2 = (date) => {
  let value;
  if (date) {
    let splitDate = date.split('/');
    if (splitDate[0].length == 1) {
      splitDate[0] = '0' + splitDate[0];
    }
    if (splitDate[1].length == 1) {
      splitDate[1] = '0' + splitDate[1];
    }
    let newDate = splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1] + 'T00:00:00';
    // console.log('formatDate2 is running, date:', date, 'newDate:', newDate);
    value = format(parseISO(newDate), 'EEEE, MMM d, yyyy');
  }
  return value;
};

const formatDate = (month, day) => {
  console.log('formatDate is running, month:', month, 'day:', day, 'i18nLocale.value:', i18nLocale.value);
  let monthNumber = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  let dateLocales = {
    'ru': ru,
    'fr': fr,
    'vi': vi,
    'ch': zhCN,
    'es': es,
    'en-US': enUS,
  };
  let value;
  if (month && day) {
    let currentYear = new Date().getFullYear();
    let date = new Date(currentYear, monthNumber[month], day);
    // console.log('formatDate is running, date:', date, 'i18nLocale.value:', i18nLocale.value, 'dateLocales[i18nLocale.value]:', dateLocales[i18nLocale.value]);
    value = format(date, 'LLLL d', { locale: dateLocales[i18nLocale.value] });
  } else if (month && !day) {
    let currentYear = new Date().getFullYear();
    let date = new Date(currentYear, monthNumber[month]);
    // console.log('formatDate is running, date:', date, 'i18nLocale.value:', i18nLocale.value, 'dateLocales[i18nLocale.value]:', dateLocales[i18nLocale.value]);
    value = format(date, 'LLLL', { locale: dateLocales[i18nLocale.value] });
  } else {
    value = 'TBD';
  }
  return value;
};

const parseYearRound = (yearRound) => {
  let value;
  if (yearRound == 'Yes') {
    value = t(yearRound);
  } else {
    value = yearRound;
  }
  return value;
};

const parseTimeRange = (day, rawStartTime, rawEndTime) => {
  let exceptionDays = Object.keys(exceptionsWithCounter.value);
  let exceptionNumber;
  if (exceptionDays.includes(day)) {
    exceptionNumber = exceptionsWithCounter.value[day].counter;
  }
  console.log('parseTimeRange, day:', day, 'exceptionDays:', exceptionDays, 'exceptionNumber:', exceptionNumber, 'rawStartTime:', rawStartTime, 'rawEndTime:', rawEndTime);
  let startTime, endTime, value;
  if (rawStartTime === '9:00') {
    rawStartTime = '09:00';
  }
  if (rawStartTime) {
    startTime = format(parseISO('2022-05-24T' + rawStartTime), 'h:mm aaaa');
  }
  console.log('startTime:', startTime);
  if (rawEndTime) {
    endTime = format(parseISO('2022-05-24T' + rawEndTime), 'h:mm aaaa');
  }
  console.log('endTime:', endTime);
  if (startTime && endTime) {
    value = startTime + ' - ' + endTime;
  } else {
    value = 'Closed';
  }
  if (value && exceptionNumber) {
    for (let i=0; i<exceptionNumber; i++) {
      value += "*";
    }
  }
  return value;
};

const parseAddress = (address) => {
  const formattedAddress = address.replace(/(Phila.+)/g, city => `<div>${city}</div>`).replace(/^\d+\s[A-z]+\s[A-z]+/g, lineOne => `<div>${lineOne}</div>`).replace(/,/, '');
  return formattedAddress;
};

const makeValidUrl = (url) => {
  let newUrl = window.decodeURIComponent(url);
  newUrl = newUrl
    .trim()
    .replace(/\s/g, '');
  if (/^(:\/\/)/.test(newUrl)) {
    return `http${newUrl}`;
  }
  if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
    return `http://${newUrl}`;
  }
  return newUrl;
};

const makeFacebookUrl = (url) => {
  let value = makeFacebookHandle(url);
  return 'https://www.facebook.com/' + value;
};

const makeFacebookHandle = (url) => {
  let value;
  if (url.includes('facebook.com')) {
    let urlSplit = url.split('/');
    let facebookIndex;
    if (urlSplit.indexOf('facebook.com') !== -1) {
      facebookIndex = urlSplit.indexOf('facebook.com');
    } else if (urlSplit.indexOf('www.facebook.com') !== -1) {
      facebookIndex = urlSplit.indexOf('www.facebook.com');
    }
    // console.log('makeFacebookHandle is running, urlSplit:', urlSplit, 'facebookIndex:', facebookIndex);
    if (facebookIndex >= 0) {
      value = urlSplit[facebookIndex+1];
    }
  } else if (url.includes('@')) {
    value = url.replace('@', '');
  } else if (url.includes(' ')) {
    value = url.replace(/\s/g, '');
  } else {
    value = url;
  }
  return value;
};

const makeInstagramUrl = (url) => {
  let value = makeInstagramHandle(url);
  let fixedValue = value.replace('@', '');
  return 'https://www.instagram.com/' + fixedValue;
};

const makeInstagramHandle = (url) => {
  let value;
  if (url.includes('instagram.com')) {
    let urlSplit = url.split('/');
    let instagramIndex;
    if (urlSplit.indexOf('instagram.com') !== -1) {
      instagramIndex = urlSplit.indexOf('instagram.com');
    } else if (urlSplit.indexOf('www.instagram.com') !== -1) {
      instagramIndex = urlSplit.indexOf('www.instagram.com');
    }
    if (instagramIndex >= 0) {
      value = urlSplit[instagramIndex+1];
    }
    // console.log('makeinstagramHandle is running, urlSplit:', urlSplit, 'instagramIndex:', instagramIndex, 'value:', value);
  } else if (url.includes(' ')) {
    value = url.replace(/\s/g, '');
  } else {
    value = url;
  }
  return value;
};

const makeTwitterUrl = (url) => {
  let value = makeTwitterHandle(url);
  let fixedValue = value.replace('@', '');
  return 'https://www.twitter.com/' + fixedValue;
};

const makeTwitterHandle = (url) => {
  let value;
  if (url.includes('twitter.com')) {
    let urlSplit = url.split('/');
    let twitterIndex;
    if (urlSplit.indexOf('twitter.com') !== -1) {
      twitterIndex = urlSplit.indexOf('twitter.com');
    } else if (urlSplit.indexOf('www.twitter.com') !== -1) {
      twitterIndex = urlSplit.indexOf('www.twitter.com');
    }
    if (twitterIndex >= 0) {
      value = urlSplit[twitterIndex+1];
    }
    // console.log('maketwitterHandle is running, urlSplit:', urlSplit, 'twitterIndex:', twitterIndex, 'value:', value);
  } else if (url.includes(' ')) {
    value = url.replace(/\s/g, '');
  } else {
    value = url;
  }
  return value;
};

const transformPhone = (value) => {
  var s2 = (""+value).replace(/\D/g, '');
  var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}

</script>

<template>
  <div class="main-ec-content">
    
    <div class="columns top-section">
      <div class="column is-6">
        <div
          v-if="item.properties.address"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="map-marker-alt" />
          </div>
          <div class="column is-11">
            {{ item.properties.address }}<br>
            Philadelphia, PA {{ item.properties.zip }}<br>
          </div>
        </div>

        <div
          v-if="item.properties.program_phone"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="phone" />
          </div>
          <div class="column is-11">
            <b>{{ $t('phone_org') }}:</b> {{ transformPhone(item.properties.PHONE) }}<br>
            <b>{{ $t('phone_program') }}:</b> {{ transformPhone(item.properties.program_phone) }}
          </div>
        </div>

        <div
          v-if="item.properties.contact_email"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon icon="envelope" />
          </div>
          <div class="column is-11">
            <a :href="`mailto:${item.properties.contact_email}`">{{ item.properties.contact_email }}</a>
          </div>
        </div>

        <div
          v-if="item.properties.WEBSITE_ADDRESS"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon icon="globe" />
          </div>
          <div class="column is-11">
            <a
              target="_blank"
              :href="makeValidUrl(item.properties.WEBSITE_ADDRESS)"
            >
              {{ item.properties.WEBSITE_ADDRESS }}
              <font-awesome-icon icon="external-link-alt" />
            </a>
          </div>
        </div>

        <div
          v-if="item.properties.FACEBOOK && item.properties.FACEBOOK !== 'Lloyd Hall'"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </div>
          <div class="column is-11">
            <a
              target="_blank"
              :href="makeFacebookUrl(item.properties.FACEBOOK)"
            >
              {{ makeFacebookHandle(item.properties.FACEBOOK) }}
              <font-awesome-icon icon="external-link-alt" />
            </a>
          </div>
        </div>

        <div
          v-if="item.properties.INSTAGRAM"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </div>
          <div class="column is-11">
            <a
              target="_blank"
              :href="makeInstagramUrl(item.properties.INSTAGRAM)"
            >
              {{ makeInstagramHandle(item.properties.INSTAGRAM) }}
              <font-awesome-icon icon="external-link-alt" />
            </a>
          </div>
        </div>

        <div
          v-if="showTwitter"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon :icon="['fab', 'twitter']" />
          </div>
          <div class="column is-11">
            <a
              target="_blank"
              :href="makeTwitterUrl(item.properties.TWITTER)"
            >
              {{ makeTwitterHandle(item.properties.TWITTER) }}
              <font-awesome-icon icon="external-link-alt" />
            </a>
          </div>
        </div>
      </div>

      <div class="column is-6">
        <div
          v-if="item.properties.RemoteProgrammingSelect"
          class="columns is-mobile"
        >
          <div class="column is-11">
            <b>{{ $t('remoteProgram') }}:</b> {{ item.properties.RemoteProgrammingSelect }}
          </div>
        </div>

        <div
          v-if="item.properties.REGISTRATION"
          class="columns is-mobile"
        >
          <div class="column is-11">
            <b>{{ $t('registration.category') }}:</b> {{ item.properties.REGISTRATION }}
          </div>
        </div>

        <div
          class="columns is-mobile"
        >
          <div class="column is-11">
            <b>{{ $t('registration.start') }}:</b> {{ formatDate2(item.properties.RegistrationPeriodStartDate) }}
          </div>
        </div>

        <div
          class="columns is-mobile"
        >
          <div class="column is-11">
            <b>{{ $t('registration.end') }}:</b> {{ formatDate2(item.properties.RegistrationPeriodEndDate) }}
          </div>
        </div>

        <div
          class="columns is-mobile"
        >
          <div class="column is-11">
            <b>{{ $t('programRunsFrom') }}:</b> {{ datefnsFormat(item.properties.begindate) }} - {{ datefnsFormat(item.properties.enddate) }}
          </div>
        </div>

        <div
          class="columns is-mobile"
        >
          <div class="column is-11">
            <b>{{ $t('daysOffered.category') }}:</b> {{ item.properties.daynames }}
          </div>
        </div>

        <div
          class="columns is-mobile"
        >
          <div class="column is-11">
            <b>{{ $t('timeOffered') }}:</b> {{ item.properties.ProgramDirectoryStartTimeSelect }} - {{ item.properties.ProgramDirectoryEndTimeSelect }}
          </div>
        </div>
      </div>
    </div>

    <h3
      v-if="hasFocusAreas"
      class="section-heading"
    >
      {{ $t('focusArea.plural') }}
    </h3>
    <div v-if="artsAndCulture && artsAndCulture.value > 1">
      <b>Arts and Culture:</b>{{ artsAndCulture }}
    </div>
    <div v-if="health && health.length > 1">
      <b>Sports, Health and Wellness Activities:</b>{{ health }}
    </div>
    <div v-if="characterDevelopment && characterDevelopment.length > 1">
      <b>Character Education/Positive Youth Development:</b>{{ characterDevelopment }}
    </div>
    <div v-if="communityService && communityService.length > 1">
      <b>Community Service Learning:</b>{{ communityService }}
    </div>
    <div v-if="stem && stem.length > 1">
      <b>STEM/STEAM:</b>{{ stem }}
    </div>
    <div v-if="collegeCareer && collegeCareer.length > 1">
      <b>College and Career Readiness:</b>{{ collegeCareer }}
    </div>

    <h3 class="section-heading">
      {{ $t('details') }}
    </h3>
    <div v-html="item.properties.servicedesc" />
    <!-- <div v-html="item.properties.programdescription" /> -->

    <br>

    <div v-if="getAges(item) !== null">
      <b>{{ $t('ages') }}:</b> {{ getAges(item) }}
    </div>

    <div v-if="getGrades(item) !== null">
      <b>{{ $t('grades') }}:</b> {{ getGrades(item) }}
    </div>

    <div v-if="item.properties.COSTS !== null">
      <b>{{ $t('costs') }}:</b> {{ item.properties.COSTS }}
    </div>

    <div v-if="item.properties.FEE_AMOUNT !== null">
      <b>{{ $t('feeAmount') }}:</b> ${{ item.properties.FEE_AMOUNT }}
    </div>

    <div v-if="item.properties.FEE_FREQUENCY !== null">
      <b>{{ $t('feeFrequency') }}:</b> {{ item.properties.FEE_FREQUENCY }}
    </div>

    <div v-if="item.properties.FEE_DESCRIPTION !== null">
      <b>{{ $t('feeDescription') }}:</b> {{ item.properties.FEE_DESCRIPTION }}
    </div>

    <div v-if="item.properties.SchoolYearOrSummer !== null">
      <b>{{ $t('term.category') }}:</b> {{ item.properties.SchoolYearOrSummer }}
    </div>

    <div v-if="item.properties.SERVICES !== null">
      <b>{{ $t('services') }}:</b> {{ item.properties.SERVICES }}
    </div>

    <div v-if="item.properties.TRANSPORTATION !== null">
      <b>{{ $t('transportation.category') }}:</b> {{ item.properties.TRANSPORTATION }}
    </div>

    <div v-if="item.properties.MEALS !== null">
      <b>{{ $t('meals') }}:</b> {{ item.properties.MEALS }}
    </div>

    <div v-if="item.properties.SPECIAL_POPULATION_SERVED !== null">
      <b>{{ $t('specialPopulations') }}:</b> {{ item.properties.SPECIAL_POPULATION_SERVED }}
    </div>

    <div
      v-if="item.properties.payment_low_cost == 'Yes'"
      class="pt-4"
    >
      {{ t('payment.lowCost') }}: {{ t(`otherLowCost.${item.properties.payment_other_low_cost}`) }}
    </div>
  </div>
</template>

<style>

</style>
