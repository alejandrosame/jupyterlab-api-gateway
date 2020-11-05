import { style } from 'typestyle';

export const wrapperClass = style({
  marginTop: '6px',
  marginBottom: '0',

  borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)'
});

export const generateCodeButtonClass = style({
  boxSizing: 'border-box',

  width: '7.7em',
  height: '2em',
  flex: '0 0 auto',

  marginLeft: '5px',

  color: 'white',
  fontSize: 'var(--jp-ui-font-size1)',

  backgroundColor: 'var(--md-blue-500)',
  border: '0',
  borderRadius: '3px',

  $nest: {
    '&:hover': {
      backgroundColor: 'var(--md-blue-600)'
    },
    '&:active': {
      backgroundColor: 'var(--md-blue-700)'
    }
  }
});

export const listItemClass = style({
  paddingTop: '4px!important',
  paddingBottom: '4px!important',
  paddingLeft: '11px!important'
});

export const activeListItemClass = style({
  color: 'white!important',

  backgroundColor: 'var(--jp-brand-color1)!important',

  $nest: {
    '& .jp-icon-selectable[fill]': {
      fill: 'white'
    }
  }
});

export const listItemIconClass = style({
  width: '16px',
  height: '16px',

  marginRight: '4px'
});
