import { style } from 'typestyle';

export const serviceMenuWrapperClass = style({
  background: 'var(--jp-layout-color1)'
});

export const serviceMenuButtonClass = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',

  width: '100%',
  minHeight: '50px',

  /* top | right | bottom | left */
  padding: '4px 11px 4px 11px',

  fontSize: 'var(--jp-ui-font-size1)',
  lineHeight: '1.5em',
  color: 'var(--jp-ui-font-color1)',
  textAlign: 'left',

  border: 'none',
  borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
  borderRadius: 0,

  background: 'var(--jp-layout-color1)'
});

export const serviceMenuButtonEnabledClass = style({
  $nest: {
    '&:hover': {
      backgroundColor: 'var(--jp-layout-color2)'
    },
    '&:active': {
      backgroundColor: 'var(--jp-layout-color3)'
    }
  }
});

export const serviceMenuButtonIconClass = style({
  width: '16px',
  height: '16px',

  /* top | right | bottom | left */
  margin: 'auto 8px auto 0'
});

export const serviceMenuButtonTitleWrapperClass = style({
  flexBasis: 0,
  flexGrow: 1,

  marginTop: 'auto',
  marginBottom: 'auto',
  marginRight: 'auto'
});

export const serviceMenuButtonTitleClass = style({
  fontWeight: 700
});

export const serviceMenuButtonSubtitleClass = style({
  fontSize: '13px',

  marginBottom: 'auto'
});

export const serviceMenuButtonThumbnailClass = style({
  width: '32px',
  height: '32px',
  float: 'left',

  marginRight: '5px'
});

serviceMenuButtonThumbnailClass

export const generateCodeButtonClass = style({
  boxSizing: 'border-box',

  height: '1.4em',

  marginLeft: '5px',

  color: 'white',
  fontSize: 'var(--jp-ui-font-size1)',

  backgroundColor: 'var(--md-blue-grey-700)',
  border: '0',
  borderRadius: '3px',

  textAlign: 'center',

  $nest: {
    '&:hover': {
      backgroundColor: 'var(--md-blue-grey-900)',
      cursor: 'pointer'
    }
  }
});

export const generateCodeButtonIconClass = style({});

export const listItemClass = style({
  paddingTop: '4px!important',
  paddingBottom: '4px!important',
  paddingLeft: '11px!important'
});
