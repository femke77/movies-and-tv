import { useEffect } from "react";

const useIframeRedirectBlocker = () => {
  useEffect(() => {

    // document.addEventListener("DOMContentLoaded", function () {
    //     // Function to remove ad widgets
    //     const removeAds = () => {
    //         const adWidgets = [
    //             '#AdWidgetContainer',
    //             '#ad720',
    //             '#onexbet'
    //         ];
    
    //         adWidgets.forEach(selector => {
    //             const adElement = document.querySelector(selector);
    //             if (adElement) {
    //                 console.log('🚫 Removed ad:', adElement);
                    
    //                 adElement.remove();
    //             }
    //         });
    //     };
    
    //     // Initial removal attempt
    //     removeAds();
    
    //     // Set up a MutationObserver to watch for changes in the DOM
    //     const observer = new MutationObserver(() => {
    //         removeAds();
    //     });
    
    //     // Observe changes in the document body (or any specific container)
    //     observer.observe(document.body, {
    //         childList: true,
    //         subtree: true
    //     });
    // });

//     const iframe = document.querySelector('iframe');
// const iframeWindow = iframe.contentWindow;

// // Override location.href in the iframe
// Object.defineProperty(iframeWindow, 'location', {
//     configurable: true,
//     get: function() {
//         return { href: 'blocked' };
//     }
// });

    // (function() {
    //     // Prevent redirects by overriding 'window.location.assign' and 'window.location.replace'
    //     const preventRedirection = (event) => {
    //       event.preventDefault();
    //       console.log('Blocked page redirection');
    //     };
      
    //     // Block any attempt to change location or open a new tab/window
    //     const blockRedirectsAndOpen = () => {
    //       // Block window.location.assign and window.location.replace
    //       const originalAssign = window.location.assign;
    //       const originalReplace = window.location.replace;
      
    //       window.location.assign = function() {
    //         console.log('Blocked window.location.assign');
    //       };
      
    //       window.location.replace = function() {
    //         console.log('Blocked window.location.replace');
    //       };
      
    //       // Block window.open by overriding the function
    //       const originalOpen = window.open;
    //       window.open = function() {
    //         console.log('Blocked window.open');
    //         return null; // Return null to prevent window.open from working
    //       };
      
    //       // Block form submissions that could cause redirects
    //       const forms = document.querySelectorAll('form');
    //       forms.forEach(form => {
    //         form.addEventListener('submit', preventRedirection);
    //       });
      
    //       // Block anchor tag clicks that could cause a page redirect
    //       const links = document.querySelectorAll('a');
    //       links.forEach(link => {
    //         link.addEventListener('click', preventRedirection);
    //       });
    //     };
      
    //     // Initialize the blocking function
    //     blockRedirectsAndOpen();
      
    //     // You can also prevent specific functions from running (like dtc_sbx)
    //     window.dtc_sbx = function() {
    //       console.log('Blocked dtc_sbx execution');
    //     };
      
    //   })();
      
      
    const blockIframeOverlays = () => {
        const observer = new MutationObserver(() => {
          document.querySelectorAll("iframe").forEach((iframe) => {
            try {
              const iframeDoc = iframe.contentWindow?.document;
      
              if (iframeDoc) {
                // Look for elements that are overlays
                const overlays = iframeDoc.querySelectorAll(".overlay, .popup, .modal");
      
                overlays.forEach((el) => {
                  const computedStyle = window.getComputedStyle(el);
                  if (computedStyle.position === "absolute" || computedStyle.position === "fixed") {
                    el.style.display = "none"; // Hide overlay
                  }
                });
              }
            } catch (err) {
              console.warn("⚠️ fdfdfd Cannot access iframe content due to cross-origin restrictions.");
            }
          });
        });
      
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      };
      
      blockIframeOverlays();
      
    // const blockIframeOverlays = () => {
    //     const observer = new MutationObserver(() => {
    //       // Look for iframes added to the DOM
    //       document.querySelectorAll("iframe").forEach((iframe) => {
    //         try {
    //           // Check if iframe is cross-origin
    //           const iframeDoc = iframe.contentWindow?.document;
              
    //           if (iframeDoc) {
    //             // Detect overlays by looking for elements with absolute positioning
    //             const overlays = iframeDoc.querySelectorAll("div[style*='position: absolute']");
                
    //             overlays.forEach((el) => {
    //               console.log("🚨 Detected overlay, hiding...");
    //               el.style.display = "none"; // Hide the overlay
    //             });
    //           }
    //         } catch (err) {
    //           // Catch cross-origin errors where access is restricted
    //           console.warn("⚠️again Cannot access iframe content due to cross-origin restrictions.");
    //         }
    //       });
    //     });
      
    //     observer.observe(document.body, {
    //       childList: true, // Observe added or removed nodes
    //       subtree: true,   // Observe deep within the body
    //     });
    //   };
      
    //   blockIframeOverlays();
      
    // const blockPopups = () => {
    //     const originalOpen = window.open;
    //     window.open = function (...args) {
    //       console.log("🚨 Blocked popup attempt:", args);
    //       return null; // Prevent new tab from opening
    //     };
      
    //     window.addEventListener("blur", () => {
    //       setTimeout(() => {
    //         if (document.visibilityState === "hidden") {
    //           console.log("🚨 Popup detected! Forcing focus back.");
    //           window.focus(); // Force focus back to this tab
    //         }
    //       }, 100);
    //     });
    //   };
      
    //   blockPopups();
      
    // setInterval(() => {
    //     document.querySelectorAll("iframe").forEach((iframe) => {
    //       try {
    //         const iframeDoc = iframe.contentWindow?.document;
    //         if (iframeDoc) {
    //           const overlays = iframeDoc.querySelectorAll("div[style*='position: absolute']");
    //           overlays.forEach((el) => {
    //             console.log("🚨 Hiding overlay ad:", el);
    //             el.style.display = "none";
    //           });
    //         }
    //       } catch (err) {
    //         console.warn("⚠️ Cannot access iframe content due to cross-origin restrictions.");
    //       }
    //     });
    //   }, 2000);
      
      // Safely override window.open without causing errors
window.open = new Proxy(window.open, {
    apply(target, thisArg, args) {
      console.log("🚨 Blocked a window.open attempt:", args);
      return null; // Prevents the new tab from opening
    }
  });
  
      document.addEventListener(
        "click",
        (event) => {
          console.log("🖱️ Click detected on:", event.target);
        },
        true
      );
    // window.open = function (...args) {
    //     console.log("🚨 window.open called by:", new Error().stack);
    //     return null; // Block the pop-up
    //   };
    //   Object.defineProperty(window, "location", {
    //     set(value) {
    //       console.log("🚨 Redirect attempt detected to:", value);
    //     },
    //   });
    // const observer2 = new MutationObserver((mutations) => {
    //     mutations.forEach((mutation) => {
    //       mutation.addedNodes.forEach((node: any) => {
    //         if (node.tagName === "SCRIPT") {
    //           console.log("🚨 Injected script detected:", node);
    //           node.remove();
    //         }
    //       });
    //     });
    //   });
    //   observer2.observe(document.documentElement, { childList: true, subtree: true });
      

      // Block any unexpected script executions
// const originalSetTimeout = window.setTimeout;
// window.setTimeout = function (callback, delay) {
//   console.log("⏳ Delayed function detected:", callback);
//   return originalSetTimeout(() => {}, delay); // Replace with a no-op
// };

// Block script-based event hijacking
const originalCall = Function.prototype.call;

// Function.prototype.call = new Proxy(originalCall, {
//   apply(target, thisArg, args) {
//     const fnName = thisArg && thisArg.name ? thisArg.name : "anonymous function";

//     // Only log if the function is suspicious (e.g., `window.open`, `setTimeout`, etc.)
//     const suspiciousFns = ["open", "setTimeout", "setInterval", "postMessage"];
//     if (suspiciousFns.includes(fnName)) {
//       console.log("🚨 Function.prototype.call hijack detected! Function:", fnName, "Args:", args);
//     }

//     return target.apply(thisArg, args);
//   }
// });

// Block synthetic click dispatches
const originalDispatchEvent = EventTarget.prototype.dispatchEvent;
EventTarget.prototype.dispatchEvent = function (event) {
  if (event.type === "click" || event.type === "mousedown") {
    console.log("🚨 Synthetic event detected:", event);
  }
  return originalDispatchEvent.call(this, event);
};
// document.querySelectorAll("iframe").forEach((iframe) => {
//     console.log("🚨 Removing iframe:", iframe);
//     iframe.remove();
//   });
  
  // Prevent iframes from loading again
//   const iframeObserver = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//       mutation.addedNodes.forEach((node) => {
//         if (node.tagName === "IFRAME") {
//           console.log("🚨 Detected new iframe, removing...");
//           node.remove();
//         }
//       });
//     });
//   });
//   iframeObserver.observe(document.body, { childList: true, subtree: true });
  
  // Stop iframe-based click hijacking
  document.addEventListener(
    "click",
    (event) => {
      if (event.target.tagName === "IFRAME") {
        console.log("🚨 Click blocked inside iframe!");
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
      document.addEventListener(
        "click",
        (event) => {
          console.log("Click event:", event);
          console.log("Clicked on:", event.target);
        },
        true
      );
      
    console.log("useIframeRedirectBlocker initialized");
    // const observer = new MutationObserver((mutations) => {
    //     mutations.forEach((mutation) => {
    //       mutation.addedNodes.forEach((node: any) => {
    //         if (node.tagName === "IFRAME") {
    //           console.log("🚨 Detected new iframe, removing...");
    //           node.remove();
    //         } else if (node.querySelector && node.querySelector("iframe")) {
    //           console.log("🚨 Detected iframe inside a div, removing parent...");
    //           node.remove();
    //         }
    //       });
    //     });
    //   });
      
    //   observer.observe(document.body, { childList: true, subtree: true });
      
    // Block window.open globally
    const originalWindowOpen = window.open;
    window.open = function (...args) {
      console.log("Blocked window.open attempt:", args);
      return null;
    };
    let lastFocus = Date.now();

    window.addEventListener("focus", () => {
      lastFocus = Date.now();
    });
    
    window.addEventListener("blur", () => {
      setTimeout(() => {
        if (Date.now() - lastFocus > 500) {
          console.log("Blocked a pop-up using focus method");
          window.focus(); // Force focus back
        }
      }, 100);
    });

    document.body.addEventListener("click", function (event) {
        let el = event.target as any;
        while (el) {
          if (el.tagName === "A" && el.target === "_blank") {
            event.preventDefault();
            console.log("Blocked a new tab from opening!");
            break;
          }
          el = el.parentElement;
        }
      }, true);

    // Block pop-up attempts from postMessage
    const originalPostMessage = window.postMessage;
    window.postMessage = function (message, targetOrigin, transfer) {
      const dataStr = JSON.stringify(message).toLowerCase();
      const blockPatterns = ["window.open", "location.href", "redirect", "_blank", "popup"];

      if (blockPatterns.some((pattern) => dataStr.includes(pattern))) {
        console.log("Blocked navigation postMessage:", message);
        return null;
      }
      return originalPostMessage.call(this, message, targetOrigin, transfer);
    };

    // Capture and block iframe redirects
    const blockIframeRedirects = (event) => {
      if (!event.target || event.target.tagName !== "IFRAME") return;

      const blockEvent = (e) => {
        console.log("Blocked iframe redirection");
        e.preventDefault();
        e.stopImmediatePropagation();
      };

      ["click", "auxclick", "contextmenu", "mousedown"].forEach((ev) =>
        event.target.contentWindow?.document?.addEventListener(ev, blockEvent, true)
      );
    };

    // Block any iframe click hijacking
    // const monitorIframe = () => {
    //   document.querySelectorAll("iframe").forEach((iframe) => {
    //     try {
    //       const iframeDoc = iframe.contentWindow?.document;
    //       if (iframeDoc) {
    //         ["click", "auxclick", "contextmenu", "mousedown"].forEach((ev) =>
    //           iframeDoc.addEventListener(ev, (e) => {
    //             console.log("Blocked unwanted event inside iframe:", ev);
    //             e.stopPropagation();
    //             e.preventDefault();
    //           }, true)
    //         );
    //       }
    //     } catch (err) {
    //       console.warn("Failed to attach event listener to iframe:", err);
    //     }
    //   });
    // };

    // Periodically check for new iframes
    // const iframeInterval = setInterval(monitorIframe, 2000);

    // Block global iframe click hijacking
    document.addEventListener("click", blockIframeRedirects, true);

    // Cleanup on unmount
    return () => {
      window.open = originalWindowOpen;
      window.postMessage = originalPostMessage;
    //   clearInterval(iframeInterval);
      document.removeEventListener("click", blockIframeRedirects, true);
    };
  }, []);

  return null;
};

export default useIframeRedirectBlocker;
