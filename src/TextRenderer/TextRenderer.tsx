/**
 * TextRenderer
 */
import './TextRenderer.css';
import TextUnit from './TextUnit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Verse, Chapter, Text } from '../typescript/Text';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TextRenderer({ text } : { text: Text | undefined }) {
  const heading = text?.title;
  // console.log(text ? text.title : 'No title');
  return (
    <div className="TextContainer">
      <form className="TextRendererRow TextForm">
        <select className="TextSelect">
          <option>1 John</option>
          <option>2 John</option>
          <option>3 John</option>
        </select>
        <select className="TextSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </form>
      <div className="TextRendererRow">
        <div id="RenderedText">
          {
            text ? (
              <span className="TextHeading">{heading}</span>
            ) : ''
          }
          <TextUnit>
            <span>{`${text}`}</span>
          </TextUnit>
        </div>
      </div>
      {/* <div id="popup-container"></div> */}
    </div>
  );
}

export default TextRenderer;
