const EventTags = ({tags}:{tags:string[]}) => {
  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {tags.map((tag, index) => (
        <div className="pill" key={index}>{tag}</div>
      ))}
    </div>
  )
}

export default EventTags
