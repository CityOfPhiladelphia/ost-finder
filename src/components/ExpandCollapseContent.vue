<template>
  <div :class="isMobile ? 'main-content-mobile' : 'main-content'">
    <print-share-section
      :item="item"
    />
    <div class="columns top-section">
      <div class="column is-6">
        <div
          v-if="item.attributes.address"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="map-marker-alt" />
          </div>
          <div class="column is-11">
            {{ item.attributes.address }}<br>
            Philadelphia, PA {{ item.attributes.zip }}<br>
          </div>
        </div>

        <div
          v-if="item.attributes.program_phone"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="phone" />
          </div>
          <div class="column is-11">
            <b>{{ $t('phone_org') }}:</b> {{ transformPhone(item.attributes.PHONE) }}<br>
            <b>{{ $t('phone_program') }}:</b> {{ transformPhone(item.attributes.program_phone) }}
          </div>
        </div>

        <div
          v-if="item.attributes.contact_email"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon icon="envelope" />
          </div>
          <div class="column is-11">
            <a :href="`mailto:${item.attributes.contact_email}`">{{ item.attributes.contact_email }}</a>
          </div>
        </div>

        <div
          v-if="item.attributes.WEBSITE_ADDRESS"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon icon="globe" />
          </div>
          <div class="column is-11">
            <a
              target="_blank"
              :href="makeValidUrl(item.attributes.WEBSITE_ADDRESS)"
            >
              {{ item.attributes.WEBSITE_ADDRESS }}
              <font-awesome-icon icon="external-link-alt" />
            </a>
          </div>
        </div>

        <div
          v-if="item.attributes.FACEBOOK && item.attributes.FACEBOOK !== 'Lloyd Hall'"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </div>
          <div class="column is-11">
            <a
              target="_blank"
              :href="makeFacebookUrl(item.attributes.FACEBOOK)"
            >
              {{ makeFacebookHandle(item.attributes.FACEBOOK) }}
              <font-awesome-icon icon="external-link-alt" />
            </a>
          </div>
        </div>

        <div
          v-if="item.attributes.INSTAGRAM"
          class="columns is-mobile website-div"
        >
          <div class="column is-1">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </div>
          <div class="column is-11">
            <a
              target="_blank"
              :href="makeInstagramUrl(item.attributes.INSTAGRAM)"
            >
              {{ makeInstagramHandle(item.attributes.INSTAGRAM) }}
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
              :href="makeTwitterUrl(item.attributes.TWITTER)"
            >
              {{ makeTwitterHandle(item.attributes.TWITTER) }}
              <font-awesome-icon icon="external-link-alt" />
            </a>
          </div>
        </div>
      </div>

      <div class="column is-6">
        <div
          v-if="item.attributes.RemoteProgrammingSelect"
          class="columns is-mobile"
        >
          <div class="column is-11">
            <b>{{ $t('remoteProgram') }}:</b> {{ item.attributes.RemoteProgrammingSelect }}
          </div>
        </div>

        <div
          v-if="item.attributes.REGISTRATION"
          class="columns is-mobile"
        >
          <div class="column is-11">
            <b>{{ $t('registration.category') }}:</b> {{ item.attributes.REGISTRATION }}
          </div>
        </div>

        <div
          class="columns is-mobile"
        >
          <div class="column is-11">
            <b>{{ $t('registration.start') }}:</b> {{ formatDate2(item.attributes.RegistrationPeriodStartDate) }}
          </div>
        </div>

        <div
          class="columns is-mobile"
        >
          <div class="column is-11">
            <b>{{ $t('registration.end') }}:</b> {{ formatDate2(item.attributes.RegistrationPeriodEndDate) }}
          </div>
        </div>

        <div
          class="columns is-mobile"
        >
          <div class="column is-11">
            <b>{{ $t('programRunsFrom') }}:</b> {{ datefnsFormat(item.attributes.begindate) }} - {{ datefnsFormat(item.attributes.enddate) }}
          </div>
        </div>

        <div
          class="columns is-mobile"
        >
          <div class="column is-11">
            <b>{{ $t('daysOffered.category') }}:</b> {{ item.attributes.daynames }}
          </div>
        </div>

        <div
          class="columns is-mobile"
        >
          <div class="column is-11">
            <b>{{ $t('timeOffered') }}:</b> {{ item.attributes.ProgramDirectoryStartTimeSelect }} - {{ item.attributes.ProgramDirectoryEndTimeSelect }}
          </div>
        </div>
      </div>
    </div>

    <h3
      v-if="this.hasFocusAreas"
      class="section-heading"
    >
      {{ $t('focusArea.plural') }}
    </h3>
    <div v-if="this.artsAndCulture && this.artsAndCulture.length > 1">
      <b>Arts and Culture:</b>{{ this.artsAndCulture }}
    </div>
    <div v-if="this.health && this.health.length > 1">
      <b>Sports, Health and Wellness Activities:</b>{{ this.health }}
    </div>
    <div v-if="this.characterDevelopment && this.characterDevelopment.length > 1">
      <b>Character Education/Positive Youth Development:</b>{{ this.characterDevelopment }}
    </div>
    <div v-if="this.communityService && this.communityService.length > 1">
      <b>Community Service Learning:</b>{{ this.communityService }}
    </div>
    <div v-if="this.stem && this.stem.length > 1">
      <b>STEM/STEAM:</b>{{ this.stem }}
    </div>
    <div v-if="this.collegeCareer && this.collegeCareer.length > 1">
      <b>College and Career Readiness:</b>{{ this.collegeCareer }}
    </div>

    <h3 class="section-heading">
      {{ $t('details') }}
    </h3>
    <div v-html="item.attributes.servicedesc" />
    <!-- <div v-html="item.attributes.programdescription" /> -->

    <br>

    <div v-if="getAges(item.attributes) !== null">
      <b>{{ $t('ages') }}:</b> {{ getAges(item.attributes) }}
    </div>

    <div v-if="getGrades(item.attributes) !== null">
      <b>{{ $t('grades') }}:</b> {{ getGrades(item.attributes) }}
    </div>

    <div v-if="item.attributes.COSTS !== null">
      <b>{{ $t('costs') }}:</b> {{ item.attributes.COSTS }}
    </div>

    <div v-if="item.attributes.FEE_AMOUNT !== null">
      <b>{{ $t('feeAmount') }}:</b> ${{ item.attributes.FEE_AMOUNT }}
    </div>

    <div v-if="item.attributes.FEE_FREQUENCY !== null">
      <b>{{ $t('feeFrequency') }}:</b> {{ item.attributes.FEE_FREQUENCY }}
    </div>

    <div v-if="item.attributes.FEE_DESCRIPTION !== null">
      <b>{{ $t('feeDescription') }}:</b> {{ item.attributes.FEE_DESCRIPTION }}
    </div>

    <div v-if="item.attributes.SchoolYearOrSummer !== null">
      <b>{{ $t('term.category') }}:</b> {{ item.attributes.SchoolYearOrSummer }}
    </div>

    <div v-if="item.attributes.SERVICES !== null">
      <b>{{ $t('services') }}:</b> {{ item.attributes.SERVICES }}
    </div>

    <div v-if="item.attributes.TRANSPORTATION !== null">
      <b>{{ $t('transportation.category') }}:</b> {{ item.attributes.TRANSPORTATION }}
    </div>

    <div v-if="item.attributes.MEALS !== null">
      <b>{{ $t('meals') }}:</b> {{ item.attributes.MEALS }}
    </div>

    <div v-if="item.attributes.SPECIAL_POPULATION_SERVED !== null">
      <b>{{ $t('specialPopulations') }}:</b> {{ item.attributes.SPECIAL_POPULATION_SERVED }}
    </div>

    <!-- <h3 class="section-heading">
      {{ $t('paymentOptions') }}
    </h3>

    <vue-good-table
      :columns="paymentOptions.columns"
      :rows="paymentOptions.rows"
      :sort-options="{ enabled: false }"
      style-class="vgt-table condensed"
    >
      <template
        slot="table-column"
        slot-scope="props"
      >
        <span
          v-if="props.column.label =='Service'"
          class="table-header-text"
        >
          {{ $t(props.column.i18nLabel) }}
        </span>
        <div
          v-if="props.column.label =='Accepted'"
          class="center table-header-text"
        >
          {{ $t(props.column.i18nLabel) }}
        </div>
      </template>

      <template
        slot="table-row"
        slot-scope="props"
      >
        <span
          v-if="props.column.field == 'service'"
          class="table-text"
        >
          {{ $t(props.row.service) }}
        </span>
        <div
          v-if="props.column.field == 'value'"
          class="center"
        >
          <font-awesome-icon
            v-if="props.row.value == 'Yes'"
            :icon="['far', 'check']"
          />
        </div>
      </template>
    </vue-good-table> -->

    <div
      v-if="item.attributes.payment_low_cost == 'Yes'"
      class="pt-4"
    >
      {{ this.$i18n.messages[this.i18nLocale].payment['lowCost'] }}: {{ this.$i18n.messages[this.i18nLocale].otherLowCost[item.attributes.payment_other_low_cost] }}
    </div>
  </div>
</template>

<script>

import { format, parseISO } from 'date-fns';
import { fr, vi, ru, es, enUS } from 'date-fns/locale';
import * as zh from 'date-fns/locale/zh-CN/index.js';

import SharedFunctions from '@phila/pinboard/src/components/mixins/SharedFunctions.vue';
// import { VueGoodTable } from 'vue-good-table';

import PrintShareSection from '@phila/pinboard/src/components/PrintShareSection';

export default {
  name: 'ExpandCollapseContent',
  components: {
    // VueGoodTable,
    PrintShareSection,
  },
  mixins: [ SharedFunctions ],
  props: {
    item: {
      type: Object,
      default: function(){
        return {};
      },
    },
  },
  computed: {
    hasFocusAreas() {
      return this.item.attributes.isArt || this.item.attributes.isHealth || this.item.attributes.isCharacterDevelopment || this.item.attributes.isCommunityService || this.item.attributes.isSTEM || this.item.attributes.isCareerConnected;
    },
    artsAndCulture() {
      let value = ' ';
      if (this.item.attributes['Arts and Culture']) {
        for (let i=0; i<this.item.attributes['Arts and Culture'].length-1; i++) {
          value += this.item.attributes['Arts and Culture'][i] + ', ';
        }
        value += this.item.attributes['Arts and Culture'][this.item.attributes['Arts and Culture'].length-1];
      }
      return value;
    },
    health() {
      let value = ' ';
      if (this.item.attributes['Sports, Health and Wellness Activities']) {
        for (let i=0; i<this.item.attributes['Sports, Health and Wellness Activities'].length-1; i++) {
          value += this.item.attributes['Sports, Health and Wellness Activities'][i] + ', ';
        }
        value += this.item.attributes['Sports, Health and Wellness Activities'][this.item.attributes['Sports, Health and Wellness Activities'].length-1];
      }
      return value;
    },
    characterDevelopment() {
      let value = ' ';
      if (this.item.attributes['Character Education/Positive Youth Development']) {
        for (let i=0; i<this.item.attributes['Character Education/Positive Youth Development'].length-1; i++) {
          value += this.item.attributes['Character Education/Positive Youth Development'][i] + ', ';
        }
        value += this.item.attributes['Character Education/Positive Youth Development'][this.item.attributes['Character Education/Positive Youth Development'].length-1];
      }
      return value;
    },
    communityService() {
      let value = ' ';
      if (this.item.attributes['Community Service Learning']) {
        for (let i=0; i<this.item.attributes['Community Service Learning'].length-1; i++) {
          value += this.item.attributes['Community Service Learning'][i] + ', ';
        }
        value += this.item.attributes['Community Service Learning'][this.item.attributes['Community Service Learning'].length-1];
      }
      return value;
    },
    stem() {
      let value = ' ';
      if (this.item.attributes['STEM/STEAM']) {
        for (let i=0; i<this.item.attributes['STEM/STEAM'].length-1; i++) {
          value += this.item.attributes['STEM/STEAM'][i] + ', ';
        }
        value += this.item.attributes['STEM/STEAM'][this.item.attributes['STEM/STEAM'].length-1];
      }
      return value;
    },
    collegeCareer() {
      let value = ' ';
      if (this.item.attributes['College and Career Readiness']) {
        for (let i=0; i<this.item.attributes['College and Career Readiness'].length-1; i++) {
          value += this.item.attributes['College and Career Readiness'][i] + ', ';
        }
        value += this.item.attributes['College and Career Readiness'][this.item.attributes['College and Career Readiness'].length-1];
      }
      return value;
    },
    showTwitter() {
      let value = false;
      let badValues = [ 'N/A', 'n/a', 'na', 'NA', 'Na', 'nA', 'none' ];
      if (this.item.attributes.TWITTER && !badValues.includes(this.item.attributes.TWITTER)) {
        value = true;
      }
      return value;
    },
    parking() {
      let value;
      if (this.item.attributes.transit_parking) {
        console.log('parking computed, this.item.attributes.transit_parking.split():', this.item.attributes.transit_parking.split(','));
        value = this.item.attributes.transit_parking.split(',');
      }
      return value;
    },
    i18nLocale() {
      return this.$i18n.locale;
    },
    paymentOptions() {
      let columns = [
        {
          label: 'Service',
          i18nLabel: 'service',
          field: 'service',
          thClass: 'th-black-class',
          tdClass: 'table-text',
        },
        {
          label: 'Accepted',
          i18nLabel: 'accepted',
          field: 'value',
          thClass: 'th-black-class',
          tdClass: 'table-text',
        },
      ];
      let rows = [
        {
          id: 1,
          service: this.$i18n.messages[this.i18nLocale].payment['SNAP'],
          value: this.item.attributes.payment_snap,
        },
        {
          id: 2,
          service: this.$i18n.messages[this.i18nLocale].payment['FMNP'],
          value: this.item.attributes.payment_fmnp,
        },
        {
          id: 3,
          service: this.$i18n.messages[this.i18nLocale].payment['foodBucks'],
          value: this.item.attributes.payment_philly_food_bucks,
        },
        {
          id: 6,
          service: this.$i18n.messages[this.i18nLocale].payment['lowCost'] + ' ('+ this.$i18n.messages[this.i18nLocale]['seeBelow'] + ')',
          value: this.item.attributes.payment_other_low_cost != null ? 'Yes' : 'No',
        },
        {
          id: 4,
          service: this.$i18n.messages[this.i18nLocale].payment['credit'],
          value: this.item.attributes.payment_credit,
        },
        {
          id: 5,
          service: this.$i18n.messages[this.i18nLocale].payment['cash'],
          value: this.item.attributes.payment_cash,
        },
      ];
      return { columns, rows };
    },
    days() {
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
        let scheduleOrClosed = this.parseTimeRange(day, this.item.attributes['hours_'+day+'_start'], this.item.attributes['hours_'+day+'_end']);
        // let scheduleOrClosed = this.parseTimeRange(day, this.item.attributes['hours_'+day+'_start'], this.item.attributes['hours_'+day+'_end']);
        if (scheduleOrClosed !== 'Closed') {
          rows.push({
            id: index + 1,
            days: this.daysKey[day],
            schedule: scheduleOrClosed,
          });
        }
      }
      return { columns, rows };

    },
    daysKey() {
      return {
        'mon': 'Monday',
        'tues': 'Tuesday',
        'wed': 'Wednesday',
        'thurs': 'Thursday',
        'fri': 'Friday',
        'sat': 'Saturday',
        'sun': 'Sunday',
        // 'MON': 'Monday',
        // 'TUES': 'Tuesday',
        // 'WED': 'Wednesday',
        // 'THURS': 'Thursday',
        // 'FRI': 'Friday',
        // 'SAT': 'Saturday',
        // 'SUN': 'Sunday',
      };
    },
    exceptionsList() {
      // let days = [ 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN' ];
      let days = [ 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun' ];
      let exceptionsArray = [];
      for (let day of days) {
        let dayException = this.item.attributes['hours_' + day + '_exceptions'];
        if (dayException) {
          exceptionsArray.push(dayException);
        }
      }
      let exceptionsSet = new Set(exceptionsArray);
      let exceptionsSetArray = [ ...exceptionsSet ];
      return exceptionsSetArray;
    },
    exceptionsByDay() {
      // let days = [ 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN' ];
      let days = [ 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun' ];
      let exceptions = {};
      for (let day of days) {
        let dayException = this.item.attributes['hours_' + day + '_exceptions'];
        if (dayException) {
          exceptions[day] = dayException;
        }
      }
      return exceptions;
    },
    exceptionsWithCounter() {
      let exceptionsWithCounter = {};
      for (let day = 0; day < Object.keys(this.exceptionsByDay).length; day++) {
        exceptionsWithCounter[Object.keys(this.exceptionsByDay)[day]] = {
          value: Object.keys(this.exceptionsByDay)[day],
          counter: 1+this.exceptionsList.indexOf(this.exceptionsByDay[Object.keys(this.exceptionsByDay)[day]]),
        };
      }
      console.log('exceptionsWithCounter:', exceptionsWithCounter);
      return exceptionsWithCounter;
    },
  },
  mounted() {
    // console.log('ExpandCollapseContent.vue mounted, this.item.attributes.transit_subway.length:', this.item.attributes.transit_subway.length, 'this.item.attributes.transit_subway:', this.item.attributes.transit_subway);
  },
  methods: {
    transformPhone(phoneNumber) {
      var s2 = (""+phoneNumber).replace(/\D/g, '');
      var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
      return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
    },
    getAges(item) {
      // console.log('getAges is running, item:', item);
      let options = [ 'isUnder5', 'is5to10', 'is11to13', 'is14to18', 'isAbove18' ];
      let finalAges = [];
      for (let option of options) {
        if (item[option] == '1') {
          finalAges.push(this.$i18n.messages[this.i18nLocale].age[option]);
        }
      }
      return finalAges.join(', ');
    },
    getGrades(item) {
      console.log('getGrades is running, item:', item);
      let options = [ 'serviceGradeLevelPreK', 'serviceGradeLevelK', 'serviceGradeLevel6', 'serviceGradeLevel9' ];
      let finalGrades = [];
      for (let option of options) {
        if (item[option] == '1') {
          finalGrades.push(this.$i18n.messages[this.i18nLocale].grade[option]);
        }
      }
      return finalGrades.join(', ');
    },
    parseException(exception, index) {
      let parsedException = '';
      for (let i=0; i<index; i++) {
        parsedException += "*";
      }
      if (this.$i18n.messages[this.i18nLocale].exceptions && this.$i18n.messages[this.i18nLocale].exceptions[exception]) {
        parsedException += ' ' + this.$i18n.messages[this.i18nLocale].exceptions[exception];
      } else {
        parsedException += ' ' + exception;
      }
      return parsedException;
    },
    datefnsFormat_str(date) {
      console.log('datefnsFormat_str is running, date:', date);
      let value;
      if (date) {
        value = format(parseISO(date), 'EEEE, MMM d, yyyy');
      }
      return value;
    },
    datefnsFormat(date) {
      console.log('datefnsFormat is running, date:', date);
      let value;
      if (date) {
        value = format(parseISO(date), 'EEEE, MMM d, yyyy');
      }
      return value;
    },
    formatDate2(date) {
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
        console.log('formatDate2 is running, date:', date, 'newDate:', newDate);
        value = format(parseISO(newDate), 'EEEE, MMM d, yyyy');
      }
      return value;
    },
    formatDate(month, day) {
      console.log('formatDate is running, month:', month, 'day:', day, 'this.i18nLocale:', this.i18nLocale);
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
        'ch': zh,
        'es': es,
        'en-US': enUS,
      };
      let value;
      if (month && day) {
        let currentYear = new Date().getFullYear();
        let date = new Date(currentYear, monthNumber[month], day);
        // console.log('formatDate is running, date:', date, 'this.i18nLocale:', this.i18nLocale, 'dateLocales[this.i18nLocale]:', dateLocales[this.i18nLocale]);
        value = format(date, 'LLLL d', { locale: dateLocales[this.i18nLocale] });
      } else if (month && !day) {
        let currentYear = new Date().getFullYear();
        let date = new Date(currentYear, monthNumber[month]);
        // console.log('formatDate is running, date:', date, 'this.i18nLocale:', this.i18nLocale, 'dateLocales[this.i18nLocale]:', dateLocales[this.i18nLocale]);
        value = format(date, 'LLLL', { locale: dateLocales[this.i18nLocale] });
      } else {
        value = 'TBD';
      }
      return value;
    },
    parseYearRound(yearRound) {
      let value;
      if (yearRound == 'Yes') {
        value = this.$i18n.messages[this.i18nLocale].yearRound;
      } else {
        value = yearRound;
      }
      return value;
    },
    parseTimeRange(day, rawStartTime, rawEndTime) {
      let exceptionDays = Object.keys(this.exceptionsWithCounter);
      let exceptionNumber;
      if (exceptionDays.includes(day)) {
        exceptionNumber = this.exceptionsWithCounter[day].counter;
      }
      // console.log('parseTimeRange, day:', day, 'exceptionDays:', exceptionDays, 'exceptionNumber:', exceptionNumber, 'rawStartTime:', rawStartTime, 'rawEndTime:', rawEndTime);
      let startTime, endTime, value;
      if (rawStartTime) {
        startTime = format(parseISO('2022-05-24T' + rawStartTime), 'h:mm aaaa');
      }
      if (rawEndTime) {
        endTime = format(parseISO('2022-05-24T' + rawEndTime), 'h:mm aaaa');
      }
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
    },
    parseAddress(address) {
      const formattedAddress = address.replace(/(Phila.+)/g, city => `<div>${city}</div>`).replace(/^\d+\s[A-z]+\s[A-z]+/g, lineOne => `<div>${lineOne}</div>`).replace(/,/, '');
      return formattedAddress;
    },
    makeValidUrl(url) {
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
    },
    makeFacebookUrl(url) {
      let value = this.makeFacebookHandle(url);
      return 'https://www.facebook.com/' + value;
    },
    makeFacebookHandle(url) {
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
    },
    makeInstagramUrl(url) {
      let value = this.makeInstagramHandle(url);
      let fixedValue = value.replace('@', '');
      return 'https://www.instagram.com/' + fixedValue;
    },
    makeInstagramHandle(url) {
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
    },
    makeTwitterUrl(url) {
      let value = this.makeTwitterHandle(url);
      let fixedValue = value.replace('@', '');
      return 'https://www.twitter.com/' + fixedValue;
    },
    makeTwitterHandle(url) {
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
    },
    parseServiceList(list) {
      const formattedService = list;
      return formattedService;
    },
    parseTagsList(list) {
      const formattedTags = list.toLowerCase();
      // console.log('parseTagsList is running, list:', list, 'formattedTags:', formattedTags);
      // const formattedTags = list.slice().sort().join(", ");
      return formattedTags;
    },
    parkingValueWithComma(option, index) {
      let parkingList = this.item.attributes.transit_parking.split(',');
      // console.log('parkingValueWithComma is running, option:', option, 'index:', index, 'parkingList:', parkingList);
      if (index !== parkingList.length-1) {
        // console.log('parkinValueWithComma in if');
        return this.$i18n.messages[this.i18nLocale].transit.car[option.trim()] + ', ';
      }
      // console.log('parkinValueWithComma not in if, this.$i18n.messages[this.i18nLocale].transit.car[option.trim()]:', this.$i18n.messages[this.i18nLocale].transit.car[option.trim()]);
      return this.$i18n.messages[this.i18nLocale].transit.car[option.trim()];
    },
    trainValueWithComma(option, index) {
      let trainList = this.item.attributes.transit_regional_rail.split(',');
      // console.log('in trainValueWithComma, trainList:', trainList, 'option:', option);
      if (index !== trainList.length-1) {
        return this.$i18n.messages[this.i18nLocale].transit.regRail[option.trim()] + ', ';
      }
      return this.$i18n.messages[this.i18nLocale].transit.regRail[option.trim()];
    },
    subwayValueWithComma(option, index) {
      // console.log('subwayValueWithComma is running, option:', option, 'index:', index);
      let subwayList = this.item.attributes.transit_subway;
      if (index !== subwayList.length-1) {
        return this.$i18n.messages[this.i18nLocale].transit.subway[option.trim()] + ', ';
      }
      return this.$i18n.messages[this.i18nLocale].transit.subway[option.trim()];
    },
  },
};

</script>

<style lang="scss">

// .td-style {
//   font-size: 14px !important;
// }
//
// .td-textbox {
//   padding-left: 2rem;
// }
//
// .section-title {
//   margin-bottom: .5rem !important;
// }

</style>
