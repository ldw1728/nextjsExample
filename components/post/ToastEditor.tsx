import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export default function ToastEditor(){

    const editorRef =  useRef<Editor>(null);

    const handleRegist = () => {
        console.log('beforer')
        console.log(editorRef.current?.getInstance().getMarkdown());
    }

    return (
        <div className=''>
            <Editor
            ref={editorRef}
            previewStyle="vertical"   // 미리보기 스타일 지정
            height="90%"            // 에디터 창 높이
            minHeight='auto'
            initialValue = ' '
            initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
            toolbarItems={[           // 툴바 옵션 설정
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote'],
                ['ul', 'ol', 'task', 'indent', 'outdent'],
                ['table', 'image', 'link'],
                ['code', 'codeblock']
            ]}
            ></Editor>
            <div className="m-2 float-right border-2 bg-slate-200 border-slate-300 text-sm
           text-center p-1 font-semibold drop-shadow-md  
            hover:border-slate-400 duration-200 cursor-pointer" onClick={handleRegist}>write</div>
      </div>
  
    )
}