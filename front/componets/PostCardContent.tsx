import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Input, Button } from "antd";
import { useSelector } from "react-redux";

const { TextArea } = Input;

export default function PostCardContent({ postData, editMode, onCancelUpdate, onChangePost }) {
  const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
  const [editText, setEditText] = useState(postData);

  useEffect(() => {
    if(updatePostDone) {
      onCancelUpdate();
    }
  }, [updatePostDone])

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  // 첫번째 게시글 #해시태그
  return (
    <div>
      {editMode ? (
        <>
          <TextArea value={editText} onChange={onChangeText} />
          <Button.Group>
            <Button loading={updatePostLoading} onClick={onChangePost(editText)}>
              수정
            </Button>
            <Button type="danger" onClick={onCancelUpdate}>
              취소
            </Button>
          </Button.Group>
        </>
      ) : (
        postData.split(/(#[^\s#]+)/g).map((v, i) => {
          if (v.match(/(#[^\s#]+)/g)) {
            return (
              <Link href={`/hashtag/${v.slice(1)}`} key={i}>
                <a>{v}</a>
              </Link>
            );
          }
          return v;
        })
      )}
    </div>
  );
}

PostCardContent.prototype = {
  postData: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onCancelUpdate: PropTypes.func.isRequired,
  onChangePost: PropTypes.func.isRequired,
};

PostCardContent.defaultProps = {
  editMode: false,
};
