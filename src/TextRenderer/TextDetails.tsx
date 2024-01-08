/**
 * Text Unit
 */

import { DeclensionDetails } from '../typescript/Text';

// eslint-disable-next-line react/no-unused-prop-types, react/prop-types
function TextDetails({ details } : { details: DeclensionDetails }) {
  const keys = Object.keys(details);
  return (
    <div className="TextDetails">
      {
        // @ts-ignore
        keys.filter((key) => !!details[key])
          .map((key) => (
          // @ts-ignore
            <div className="DetailsSection" key={`detail-${key}`}>
              <span className="DetailsLabel">{key}</span>
              <span className="DetailsValue">
                {
                  // @ts-ignore
                  details[key].name
                }
              </span>
            </div>
          ))
      }
    </div>
  );
}

export default TextDetails;
