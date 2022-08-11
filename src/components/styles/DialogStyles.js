
const S_ROW = {
  display: 'flex',
  alignItems: 'center',
  marginRight: 5,
  marginTop: 5,
  marginLeft: 5,
  marginBottom: 5
}
, S_ROW_SHORT = {
  marginLeft: 12,
  marginRight: 12
}
, S_LABEL = {
  color: '#1b75bb',
  display: 'inline-block',
  textAlign: 'right',
  width: 100,
  paddingRight: 5,
  fontSize: '16px',
  fontWeight: 'bold',
  userSelect: 'none'
}
, S_NONE = {
  display: 'none'
};

export const crRowLabelStyle = (
  isShowLabels=true
) => isShowLabels
  ? [
      {...S_ROW},
      {...S_LABEL}
    ]
  : [
      {...S_ROW, ...S_ROW_SHORT},
      {...S_LABEL, ...S_NONE}
    ];

export const crCaption = (
  caption
) => caption && caption.indexOf(':') === -1
  ? `${caption}:`
  : caption
