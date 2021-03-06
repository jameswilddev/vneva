import Line from "../types/line";
import extractBackgroundName from "./extract-background-name";

describe(`lexer`, () => {
  describe(`validation`, () => {
    describe(`extraction`, () => {
      describe(`extract-background-name`, () => {
        function maps(description: string, fromLine: Line): void {
          it(description, () => {
            expect(extractBackgroundName(fromLine)).toEqual(
              `Test Background Name`
            );
          });
        }

        function doesNotMap(description: string, fromLine: Line): void {
          it(description, () => {
            expect(extractBackgroundName(fromLine)).toBeNull();
          });
        }

        maps(`scene`, {
          type: `scene`,
          name: `Test Scene Name`,
          backgroundName: `Test Background Name`,
          lineNumber: 32,
        });

        doesNotMap(`dialog without emote`, {
          type: `dialog`,
          characterName: `Test Character Name`,
          emoteName: null,
          content: `Test Content`,
          lineNumber: 32,
        });

        doesNotMap(`dialog with emote`, {
          type: `dialog`,
          characterName: `Test Character Name`,
          emoteName: `Test Emote Name`,
          content: `Test Content`,
          lineNumber: 32,
        });

        doesNotMap(`option`, {
          type: `option`,
          label: `Test Label`,
          linksToSceneName: `Test Scene Name`,
          lineNumber: 32,
        });

        doesNotMap(`unlexable`, {
          type: `unlexable`,
          original: `Test Original`,
          lineNumber: 32,
        });

        doesNotMap(`continued`, {
          type: `continued`,
          linksToSceneName: `Test Scene Name`,
          lineNumber: 32,
        });
      });
    });
  });
});
