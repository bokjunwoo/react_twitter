import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

export default function PostCardContent({ postData }) { // 첫번째 게시글 #해시태그
  return (
    <div>
      {postData.split(/(#[^|s#]+)/g).map((v, i) => {
        if (v.match(/(#[^|s#]+)/g)) {
          return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
        }
        return v
      })}
    </div>
  )
}

PostCardContent.prototype = {
  postData: PropTypes.string.isRequired
}
