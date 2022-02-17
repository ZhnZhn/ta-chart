const S_KEY = { textDecoration: 'underline' };

const _crAccessKeyIndex = (
  accessKey,
  caption
) => accessKey
  ? caption.toLowerCase().indexOf(accessKey)
  : -1;

const _crCaptionEl = (accessKeyIndex, caption) => {
  const _before = caption.substring(0, accessKeyIndex)
      , _key = caption.substring(accessKeyIndex, accessKeyIndex+1)
      , _after = caption.substring(accessKeyIndex+1);
  return (
    <>
      <span>{_before}</span>
      <span style={S_KEY}>{_key}</span>
      <span>{_after}</span>
    </>
  )
};

const CaptionInput = ({
  className,
  style,
  caption='',
  accessKey,
  children
}) => {
  const _accessKeyIndex = _crAccessKeyIndex(accessKey, caption)
  , _captionEl = (_accessKeyIndex === -1)
      ? caption
      : _crCaptionEl(_accessKeyIndex, caption);
            
    return (
      <span className={className} style={style}>
        {_captionEl}
        {children}
      </span>
    );
};

export default CaptionInput
