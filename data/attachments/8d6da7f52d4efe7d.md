# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pdp/dayii/handson4.spec.ts >> Handle file download
- Location: pdp/dayii/handson4.spec.ts:51:5

# Error details

```
TypeError: expect(test.pdf).toContain(/test.pdf/) // indexOf

Matcher error: expected value must be a string if received value is a string

Expected has type:  regexp
Expected has value: /test.pdf/
Received has type:  string
Received has value: "test.pdf"
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - navigation [ref=e4]:
      - link "QA PlayGround - Automation Testing Practice Platform QA PlayGround" [ref=e5] [cursor=pointer]:
        - /url: /
        - generic [ref=e6]:
          - img "QA PlayGround - Automation Testing Practice Platform" [ref=e7]
          - generic [ref=e8]: QA PlayGround
      - navigation "Main navigation" [ref=e9]:
        - link "Home" [ref=e10] [cursor=pointer]:
          - /url: /
        - link "Study Tracker (New feature)" [ref=e11] [cursor=pointer]:
          - /url: /study-tracker/dashboard
          - text: Study Tracker
          - generic "(New feature)" [ref=e12]: New
        - link "Bank Demo" [ref=e13] [cursor=pointer]:
          - /url: /bank
        - link "Practice" [ref=e14] [cursor=pointer]:
          - /url: /practice
        - link "QA Tools" [ref=e15] [cursor=pointer]:
          - /url: /qa-tools
        - link "Blog" [ref=e16] [cursor=pointer]:
          - /url: /blog
        - generic [ref=e17]:
          - button "Toggle theme" [ref=e18] [cursor=pointer]:
            - img
            - generic [ref=e19]: Toggle theme
          - link "Login" [ref=e20] [cursor=pointer]:
            - /url: /login
  - main [ref=e21]:
    - generic [ref=e25]:
      - navigation "Breadcrumb" [ref=e26]:
        - link "Home" [ref=e27] [cursor=pointer]:
          - /url: /
        - img [ref=e28]
        - link "Practice" [ref=e30] [cursor=pointer]:
          - /url: /practice
        - img [ref=e31]
        - generic [ref=e33]: How to Automate File Upload and Download in Selenium and Playwright
      - generic [ref=e35]:
        - generic [ref=e36]:
          - generic [ref=e37]:
            - generic [ref=e38]:
              - img [ref=e39]
              - text: Intermediate
            - generic [ref=e42]:
              - img [ref=e43]
              - text: 15 min
            - generic [ref=e46]:
              - img [ref=e47]
              - text: 5 scenarios
          - heading "File Upload & Download Automation Practice" [level=1] [ref=e50]
          - paragraph [ref=e51]: Practice uploading files via input elements and triggering file downloads — covering sendKeys, setInputFiles, and download event interception in Selenium & Playwright.
        - generic [ref=e52]:
          - region "File upload and download practice exercises" [ref=e53]:
            - generic [ref=e55]:
              - generic [ref=e56]:
                - text: "Scenario 1: Select a file to upload"
                - paragraph [ref=e57]:
                  - text: Use
                  - code [ref=e58]: sendKeys()
                  - text: (Selenium) or
                  - code [ref=e59]: setInputFiles()
                  - text: (Playwright) to set the file path on the input.
                - generic [ref=e60]:
                  - text: Select file to upload
                  - button "Select file to upload" [ref=e61]
              - separator [ref=e62]
              - generic [ref=e63]:
                - text: "Scenarios 2–5: Download files (image, PDF, Excel, Word)"
                - paragraph [ref=e64]:
                  - text: In Playwright, listen for the
                  - code [ref=e65]: download
                  - text: event before clicking. In Selenium, configure the download directory via ChromeOptions.
                - generic [ref=e66]:
                  - link "Download Image" [ref=e67] [cursor=pointer]:
                    - /url: /icons/android-chrome-512x512.png
                    - button "Download Image" [ref=e68]:
                      - text: Download Image
                      - img
                  - link "Download PDF" [ref=e69] [cursor=pointer]:
                    - /url: /docs/test.pdf
                    - button "Download PDF" [active] [ref=e70]:
                      - text: Download PDF
                      - img
                  - link "Download Excel" [ref=e71] [cursor=pointer]:
                    - /url: /docs/test.xlsx
                    - button "Download Excel" [ref=e72]:
                      - text: Download Excel
                      - img
                  - link "Download Word" [ref=e73] [cursor=pointer]:
                    - /url: /docs/test.docx
                    - button "Download Word" [ref=e74]:
                      - text: Download Word
                      - img
          - generic [ref=e76]:
            - generic [ref=e77]:
              - paragraph [ref=e78]: What You'll Learn
              - img [ref=e79]
            - generic [ref=e82]:
              - generic [ref=e83]:
                - button "Selenium (Java)" [ref=e84] [cursor=pointer]
                - button "Playwright (JS/PY)" [ref=e85] [cursor=pointer]
              - generic [ref=e86]:
                - paragraph [ref=e87]: Selenium (Java)
                - list [ref=e88]:
                  - listitem [ref=e89]:
                    - generic [ref=e91]: sendKeys("/path/to/file")
                  - listitem [ref=e92]:
                    - generic [ref=e94]: cssSelector('input[type=file]')
                  - listitem [ref=e95]:
                    - generic [ref=e97]: getAttribute('value')
                  - listitem [ref=e98]:
                    - generic [ref=e100]: Robot.keyPress()
                  - listitem [ref=e101]:
                    - generic [ref=e103]: LocalFileDetector
            - generic [ref=e104]:
              - img [ref=e105]
              - generic [ref=e108]: Tutorial video coming soon
        - generic [ref=e109]:
          - heading "Upload Test Cases" [level=2] [ref=e110]
          - generic [ref=e111]:
            - 'heading "TC01: Verify a file can be selected for upload" [level=3] [ref=e113]':
              - 'button "TC01: Verify a file can be selected for upload" [ref=e114] [cursor=pointer]':
                - generic [ref=e115]: "TC01: Verify a file can be selected for upload"
                - img [ref=e116]
            - 'heading "TC02: Verify selected file name is displayed after selection" [level=3] [ref=e119]':
              - 'button "TC02: Verify selected file name is displayed after selection" [ref=e120] [cursor=pointer]':
                - generic [ref=e121]: "TC02: Verify selected file name is displayed after selection"
                - img [ref=e122]
            - 'heading "TC03: Verify upload button is enabled after file selection" [level=3] [ref=e125]':
              - 'button "TC03: Verify upload button is enabled after file selection" [ref=e126] [cursor=pointer]':
                - generic [ref=e127]: "TC03: Verify upload button is enabled after file selection"
                - img [ref=e128]
            - 'heading "TC04: Verify file upload starts on clicking upload button" [level=3] [ref=e131]':
              - 'button "TC04: Verify file upload starts on clicking upload button" [ref=e132] [cursor=pointer]':
                - generic [ref=e133]: "TC04: Verify file upload starts on clicking upload button"
                - img [ref=e134]
            - 'heading "TC05: Verify success message appears after upload" [level=3] [ref=e137]':
              - 'button "TC05: Verify success message appears after upload" [ref=e138] [cursor=pointer]':
                - generic [ref=e139]: "TC05: Verify success message appears after upload"
                - img [ref=e140]
            - 'heading "TC06: Verify error message for unsupported file type" [level=3] [ref=e143]':
              - 'button "TC06: Verify error message for unsupported file type" [ref=e144] [cursor=pointer]':
                - generic [ref=e145]: "TC06: Verify error message for unsupported file type"
                - img [ref=e146]
            - 'heading "TC07: Verify error message for files exceeding size limit" [level=3] [ref=e149]':
              - 'button "TC07: Verify error message for files exceeding size limit" [ref=e150] [cursor=pointer]':
                - generic [ref=e151]: "TC07: Verify error message for files exceeding size limit"
                - img [ref=e152]
            - 'heading "TC08: Verify uploaded file appears in the file list" [level=3] [ref=e155]':
              - 'button "TC08: Verify uploaded file appears in the file list" [ref=e156] [cursor=pointer]':
                - generic [ref=e157]: "TC08: Verify uploaded file appears in the file list"
                - img [ref=e158]
            - 'heading "TC09: Verify file upload can be cancelled" [level=3] [ref=e161]':
              - 'button "TC09: Verify file upload can be cancelled" [ref=e162] [cursor=pointer]':
                - generic [ref=e163]: "TC09: Verify file upload can be cancelled"
                - img [ref=e164]
            - 'heading "TC10: Verify multiple files can be selected when allowed" [level=3] [ref=e167]':
              - 'button "TC10: Verify multiple files can be selected when allowed" [ref=e168] [cursor=pointer]':
                - generic [ref=e169]: "TC10: Verify multiple files can be selected when allowed"
                - img [ref=e170]
            - 'heading "TC11: Verify file input accepts only allowed extensions" [level=3] [ref=e173]':
              - 'button "TC11: Verify file input accepts only allowed extensions" [ref=e174] [cursor=pointer]':
                - generic [ref=e175]: "TC11: Verify file input accepts only allowed extensions"
                - img [ref=e176]
            - 'heading "TC12: Verify file upload is responsive on mobile viewport" [level=3] [ref=e179]':
              - 'button "TC12: Verify file upload is responsive on mobile viewport" [ref=e180] [cursor=pointer]':
                - generic [ref=e181]: "TC12: Verify file upload is responsive on mobile viewport"
                - img [ref=e182]
            - 'heading "TC13: Verify file upload is accessible via keyboard" [level=3] [ref=e185]':
              - 'button "TC13: Verify file upload is accessible via keyboard" [ref=e186] [cursor=pointer]':
                - generic [ref=e187]: "TC13: Verify file upload is accessible via keyboard"
                - img [ref=e188]
            - 'heading "TC14: Verify file upload component has accessible label" [level=3] [ref=e191]':
              - 'button "TC14: Verify file upload component has accessible label" [ref=e192] [cursor=pointer]':
                - generic [ref=e193]: "TC14: Verify file upload component has accessible label"
                - img [ref=e194]
            - 'heading "TC15: Verify file upload page loads without errors" [level=3] [ref=e197]':
              - 'button "TC15: Verify file upload page loads without errors" [ref=e198] [cursor=pointer]':
                - generic [ref=e199]: "TC15: Verify file upload page loads without errors"
                - img [ref=e200]
        - generic [ref=e202]:
          - heading "Download Test Cases" [level=2] [ref=e203]
          - generic [ref=e204]:
            - 'heading "TC01: Verify download starts on clicking the download button" [level=3] [ref=e206]':
              - 'button "TC01: Verify download starts on clicking the download button" [ref=e207] [cursor=pointer]':
                - generic [ref=e208]: "TC01: Verify download starts on clicking the download button"
                - img [ref=e209]
            - 'heading "TC02: Verify downloaded file name matches expected value" [level=3] [ref=e212]':
              - 'button "TC02: Verify downloaded file name matches expected value" [ref=e213] [cursor=pointer]':
                - generic [ref=e214]: "TC02: Verify downloaded file name matches expected value"
                - img [ref=e215]
            - 'heading "TC03: Verify downloaded file is not empty" [level=3] [ref=e218]':
              - 'button "TC03: Verify downloaded file is not empty" [ref=e219] [cursor=pointer]':
                - generic [ref=e220]: "TC03: Verify downloaded file is not empty"
                - img [ref=e221]
            - 'heading "TC04: Verify downloaded file content matches expected data" [level=3] [ref=e224]':
              - 'button "TC04: Verify downloaded file content matches expected data" [ref=e225] [cursor=pointer]':
                - generic [ref=e226]: "TC04: Verify downloaded file content matches expected data"
                - img [ref=e227]
            - 'heading "TC05: Verify download button has accessible label" [level=3] [ref=e230]':
              - 'button "TC05: Verify download button has accessible label" [ref=e231] [cursor=pointer]':
                - generic [ref=e232]: "TC05: Verify download button has accessible label"
                - img [ref=e233]
            - 'heading "TC06: Verify download button is keyboard accessible" [level=3] [ref=e236]':
              - 'button "TC06: Verify download button is keyboard accessible" [ref=e237] [cursor=pointer]':
                - generic [ref=e238]: "TC06: Verify download button is keyboard accessible"
                - img [ref=e239]
            - 'heading "TC07: Verify download link href attribute is correct" [level=3] [ref=e242]':
              - 'button "TC07: Verify download link href attribute is correct" [ref=e243] [cursor=pointer]':
                - generic [ref=e244]: "TC07: Verify download link href attribute is correct"
                - img [ref=e245]
            - 'heading "TC08: Verify download works on different browsers" [level=3] [ref=e248]':
              - 'button "TC08: Verify download works on different browsers" [ref=e249] [cursor=pointer]':
                - generic [ref=e250]: "TC08: Verify download works on different browsers"
                - img [ref=e251]
            - 'heading "TC09: Verify download is responsive on mobile viewport" [level=3] [ref=e254]':
              - 'button "TC09: Verify download is responsive on mobile viewport" [ref=e255] [cursor=pointer]':
                - generic [ref=e256]: "TC09: Verify download is responsive on mobile viewport"
                - img [ref=e257]
            - 'heading "TC10: Verify multiple downloads can occur sequentially" [level=3] [ref=e260]':
              - 'button "TC10: Verify multiple downloads can occur sequentially" [ref=e261] [cursor=pointer]':
                - generic [ref=e262]: "TC10: Verify multiple downloads can occur sequentially"
                - img [ref=e263]
            - 'heading "TC11: Verify download does not navigate away from page" [level=3] [ref=e266]':
              - 'button "TC11: Verify download does not navigate away from page" [ref=e267] [cursor=pointer]':
                - generic [ref=e268]: "TC11: Verify download does not navigate away from page"
                - img [ref=e269]
            - 'heading "TC12: Verify download section is accessible via keyboard" [level=3] [ref=e272]':
              - 'button "TC12: Verify download section is accessible via keyboard" [ref=e273] [cursor=pointer]':
                - generic [ref=e274]: "TC12: Verify download section is accessible via keyboard"
                - img [ref=e275]
            - 'heading "TC13: Verify file download page loads without errors" [level=3] [ref=e278]':
              - 'button "TC13: Verify file download page loads without errors" [ref=e279] [cursor=pointer]':
                - generic [ref=e280]: "TC13: Verify file download page loads without errors"
                - img [ref=e281]
            - 'heading "TC14: Verify download file type matches expected MIME type" [level=3] [ref=e284]':
              - 'button "TC14: Verify download file type matches expected MIME type" [ref=e285] [cursor=pointer]':
                - generic [ref=e286]: "TC14: Verify download file type matches expected MIME type"
                - img [ref=e287]
      - article [ref=e289]:
        - generic [ref=e290]:
          - heading "Introduction" [level=2] [ref=e291]
          - paragraph [ref=e292]: "File upload and download are common test scenarios that often trip up beginners. Key points:"
          - list [ref=e293]:
            - listitem [ref=e294]:
              - strong [ref=e295]: File upload
              - text: — use
              - code [ref=e296]: "`sendKeys`"
              - text: with the absolute file path on
              - code [ref=e297]: "`<input type=\"file\">`"
              - text: (no clicking dialog)
            - listitem [ref=e298]:
              - strong [ref=e299]: File download
              - text: — configure the browser to download to a specific folder, then verify the file exists
            - listitem [ref=e300]:
              - strong [ref=e301]: Playwright
              - text: makes downloads especially easy with built-in download event handling
          - heading "Key Methods Summary" [level=2] [ref=e302]
          - table [ref=e303]:
            - rowgroup [ref=e304]:
              - row "Action Selenium (Java) Playwright (JS) Playwright (Python)" [ref=e305]:
                - columnheader "Action" [ref=e306]
                - columnheader "Selenium (Java)" [ref=e307]
                - columnheader "Playwright (JS)" [ref=e308]
                - columnheader "Playwright (Python)" [ref=e309]
            - rowgroup [ref=e310]:
              - 'row "Upload file `element.sendKeys(\"/path/file.txt\")` `locator.setInputFiles(\"path\")` `locator.set_input_files(\"path\")`" [ref=e311]':
                - cell "Upload file" [ref=e312]
                - 'cell "`element.sendKeys(\"/path/file.txt\")`" [ref=e313]':
                  - code [ref=e314]: "`element.sendKeys(\"/path/file.txt\")`"
                - 'cell "`locator.setInputFiles(\"path\")`" [ref=e315]':
                  - code [ref=e316]: "`locator.setInputFiles(\"path\")`"
                - 'cell "`locator.set_input_files(\"path\")`" [ref=e317]':
                  - code [ref=e318]: "`locator.set_input_files(\"path\")`"
              - 'row "Start download click download button `page.waitForEvent(\"download\")` `page.expect_download()`" [ref=e319]':
                - cell "Start download" [ref=e320]
                - cell "click download button" [ref=e321]
                - 'cell "`page.waitForEvent(\"download\")`" [ref=e322]':
                  - code [ref=e323]: "`page.waitForEvent(\"download\")`"
                - 'cell "`page.expect_download()`" [ref=e324]':
                  - code [ref=e325]: "`page.expect_download()`"
              - 'row "Save download browser profile path `download.saveAs(\"path\")` `download.save_as(\"path\")`" [ref=e326]':
                - cell "Save download" [ref=e327]
                - cell "browser profile path" [ref=e328]
                - 'cell "`download.saveAs(\"path\")`" [ref=e329]':
                  - code [ref=e330]: "`download.saveAs(\"path\")`"
                - 'cell "`download.save_as(\"path\")`" [ref=e331]':
                  - code [ref=e332]: "`download.save_as(\"path\")`"
              - 'row "Get filename check file system `download.suggestedFilename()` `download.suggested_filename`" [ref=e333]':
                - cell "Get filename" [ref=e334]
                - cell "check file system" [ref=e335]
                - 'cell "`download.suggestedFilename()`" [ref=e336]':
                  - code [ref=e337]: "`download.suggestedFilename()`"
                - 'cell "`download.suggested_filename`" [ref=e338]':
                  - code [ref=e339]: "`download.suggested_filename`"
              - 'row "Verify file `Files.exists(path)` `fs.existsSync(path)` `os.path.exists(path)`" [ref=e340]':
                - cell "Verify file" [ref=e341]
                - 'cell "`Files.exists(path)`" [ref=e342]':
                  - code [ref=e343]: "`Files.exists(path)`"
                - 'cell "`fs.existsSync(path)`" [ref=e344]':
                  - code [ref=e345]: "`fs.existsSync(path)`"
                - 'cell "`os.path.exists(path)`" [ref=e346]':
                  - code [ref=e347]: "`os.path.exists(path)`"
          - separator [ref=e348]
          - heading "1. Upload a file using sendKeys" [level=2] [ref=e349]
          - heading "Selenium (Java)" [level=3] [ref=e350]
          - figure [ref=e351]:
            - code [ref=e353]:
              - generic [ref=e354]: WebElement uploadInput = driver.findElement(By.id("fileUploadInput"));
              - generic [ref=e355]: uploadInput.sendKeys("/absolute/path/to/test-file.txt");
              - generic [ref=e357]: // Verify file name is shown
              - generic [ref=e358]: String fileName = driver.findElement(By.id("uploadedFileName")).getText();
              - generic [ref=e359]: assertEquals("test-file.txt", fileName);
              - button "Copy code" [ref=e360] [cursor=pointer]
          - heading "Playwright (JS)" [level=3] [ref=e362]
          - figure [ref=e363]:
            - code [ref=e365]:
              - generic [ref=e366]: await page.locator("#fileUploadInput").setInputFiles("./test-file.txt");
              - generic [ref=e367]: await expect(page.locator("#uploadedFileName")).toHaveText("test-file.txt");
              - button "Copy code" [ref=e368] [cursor=pointer]
          - heading "Playwright (Python)" [level=3] [ref=e370]
          - figure [ref=e371]:
            - code [ref=e373]:
              - generic [ref=e374]: page.locator("#fileUploadInput").set_input_files("./test-file.txt")
              - generic [ref=e375]: expect(page.locator("#uploadedFileName")).to_have_text("test-file.txt")
              - button "Copy code" [ref=e376] [cursor=pointer]
          - separator [ref=e378]
          - heading "2. Upload multiple files" [level=2] [ref=e379]
          - heading "Selenium (Java)" [level=3] [ref=e380]
          - figure [ref=e381]:
            - code [ref=e383]:
              - generic [ref=e384]: // For multiple file inputs, send multiple paths separated by newline
              - generic [ref=e385]: WebElement input = driver.findElement(By.id("multiFileInput"));
              - generic [ref=e386]: input.sendKeys("/path/file1.txt\n/path/file2.txt");
              - button "Copy code" [ref=e387] [cursor=pointer]
          - heading "Playwright (JS)" [level=3] [ref=e389]
          - figure [ref=e390]:
            - code [ref=e392]:
              - generic [ref=e393]: await page.locator("#multiFileInput").setInputFiles([
              - generic [ref=e394]: "\"./file1.txt\","
              - generic [ref=e395]: "\"./file2.txt\""
              - generic [ref=e396]: "]);"
              - button "Copy code" [ref=e397] [cursor=pointer]
          - heading "Playwright (Python)" [level=3] [ref=e399]
          - figure [ref=e400]:
            - code [ref=e402]:
              - generic [ref=e403]: page.locator("#multiFileInput").set_input_files(["./file1.txt", "./file2.txt"])
              - button "Copy code" [ref=e404] [cursor=pointer]
          - separator [ref=e406]
          - heading "3. Clear a selected file" [level=2] [ref=e407]
          - heading "Selenium (Java)" [level=3] [ref=e408]
          - figure [ref=e409]:
            - code [ref=e411]:
              - generic [ref=e412]: // Selenium cannot clear a file input directly — reload or use JS
              - generic [ref=e413]: JavascriptExecutor js = (JavascriptExecutor) driver;
              - generic [ref=e414]: js.executeScript("arguments[0].value = '';", driver.findElement(By.id("fileUploadInput")));
              - button "Copy code" [ref=e415] [cursor=pointer]
          - heading "Playwright (JS)" [level=3] [ref=e417]
          - figure [ref=e418]:
            - code [ref=e420]:
              - generic [ref=e421]: await page.locator("#fileUploadInput").setInputFiles([]);
              - button "Copy code" [ref=e422] [cursor=pointer]
          - heading "Playwright (Python)" [level=3] [ref=e424]
          - figure [ref=e425]:
            - code [ref=e427]:
              - generic [ref=e428]: page.locator("#fileUploadInput").set_input_files([])
              - button "Copy code" [ref=e429] [cursor=pointer]
          - separator [ref=e431]
          - heading "4. Download a file and verify it" [level=2] [ref=e432]
          - heading "Selenium (Java)" [level=3] [ref=e433]
          - figure [ref=e434]:
            - code [ref=e436]:
              - generic [ref=e437]: // Configure Chrome to download to a specific folder
              - generic [ref=e438]: ChromeOptions options = new ChromeOptions();
              - generic [ref=e439]: Map<String, Object> prefs = new HashMap<>();
              - generic [ref=e440]: prefs.put("download.default_directory", "/path/to/downloads");
              - generic [ref=e441]: options.setExperimentalOption("prefs", prefs);
              - generic [ref=e442]: WebDriver driver = new ChromeDriver(options);
              - generic [ref=e444]: // Click download button
              - generic [ref=e445]: driver.findElement(By.id("downloadBtn")).click();
              - generic [ref=e447]: // Wait and verify the file exists
              - generic [ref=e448]: Thread.sleep(3000); // use explicit wait in real tests
              - generic [ref=e449]: File downloadedFile = new File("/path/to/downloads/report.csv");
              - generic [ref=e450]: assertTrue(downloadedFile.exists());
              - button "Copy code" [ref=e451] [cursor=pointer]
          - heading "Playwright (JS)" [level=3] [ref=e453]
          - figure [ref=e454]:
            - code [ref=e456]:
              - generic [ref=e457]: // Playwright handles downloads natively
              - generic [ref=e458]: const [download] = await Promise.all([
              - generic [ref=e459]: page.waitForEvent("download"),
              - generic [ref=e460]: page.locator("#downloadBtn").click(),
              - generic [ref=e461]: "]);"
              - generic [ref=e463]: // Save to a specific path
              - generic [ref=e464]: await download.saveAs("./downloads/" + download.suggestedFilename());
              - generic [ref=e466]: // Verify filename
              - generic [ref=e467]: console.log("Downloaded:", download.suggestedFilename());
              - generic [ref=e468]: expect(download.suggestedFilename()).toContain("report");
              - button "Copy code" [ref=e469] [cursor=pointer]
          - heading "Playwright (Python)" [level=3] [ref=e471]
          - figure [ref=e472]:
            - code [ref=e474]:
              - generic [ref=e475]: "with page.expect_download() as download_info:"
              - generic [ref=e476]: page.locator("#downloadBtn").click()
              - generic [ref=e477]: download = download_info.value
              - generic [ref=e479]: "# Save the file"
              - generic [ref=e480]: "download.save_as(f\"./downloads/{download.suggested_filename}\")"
              - generic [ref=e482]: "# Verify filename"
              - generic [ref=e483]: print("Downloaded:", download.suggested_filename)
              - generic [ref=e484]: assert "report" in download.suggested_filename
              - button "Copy code" [ref=e485] [cursor=pointer]
          - separator [ref=e487]
          - heading "5. Verify uploaded file is accepted (success message)" [level=2] [ref=e488]
          - heading "Selenium (Java)" [level=3] [ref=e489]
          - figure [ref=e490]:
            - code [ref=e492]:
              - generic [ref=e493]: driver.findElement(By.id("fileUploadInput")).sendKeys("/path/to/image.png");
              - generic [ref=e494]: driver.findElement(By.id("uploadSubmitBtn")).click();
              - generic [ref=e496]: WebElement success = driver.findElement(By.id("uploadSuccess"));
              - generic [ref=e497]: assertTrue(success.isDisplayed());
              - generic [ref=e498]: assertEquals("File uploaded successfully!", success.getText());
              - button "Copy code" [ref=e499] [cursor=pointer]
          - heading "Playwright (JS)" [level=3] [ref=e501]
          - figure [ref=e502]:
            - code [ref=e504]:
              - generic [ref=e505]: await page.locator("#fileUploadInput").setInputFiles("./image.png");
              - generic [ref=e506]: await page.locator("#uploadSubmitBtn").click();
              - generic [ref=e507]: await expect(page.locator("#uploadSuccess")).toHaveText("File uploaded successfully!");
              - button "Copy code" [ref=e508] [cursor=pointer]
          - heading "Playwright (Python)" [level=3] [ref=e510]
          - figure [ref=e511]:
            - code [ref=e513]:
              - generic [ref=e514]: page.locator("#fileUploadInput").set_input_files("./image.png")
              - generic [ref=e515]: page.locator("#uploadSubmitBtn").click()
              - generic [ref=e516]: expect(page.locator("#uploadSuccess")).to_have_text("File uploaded successfully!")
              - button "Copy code" [ref=e517] [cursor=pointer]
          - blockquote [ref=e519]:
            - paragraph [ref=e520]:
              - text: 📄
              - strong [ref=e521]: "Also Read:"
              - link "Top 10 Best Automation Practice Website" [ref=e522] [cursor=pointer]:
                - /url: https://www.qaplayground.com/blog/top-10-best-automation-practice-website
      - generic [ref=e523]:
        - generic [ref=e524]:
          - img [ref=e525]
          - heading "Frequently Asked Questions" [level=2] [ref=e528]
        - generic [ref=e529]:
          - heading "How do I upload a file using Selenium WebDriver?" [level=3] [ref=e531]:
            - button "How do I upload a file using Selenium WebDriver?" [ref=e532] [cursor=pointer]:
              - text: How do I upload a file using Selenium WebDriver?
              - img [ref=e533]
          - heading "How do I upload a file in Playwright?" [level=3] [ref=e536]:
            - button "How do I upload a file in Playwright?" [ref=e537] [cursor=pointer]:
              - text: How do I upload a file in Playwright?
              - img [ref=e538]
          - heading "How do I verify a file download was triggered in Playwright?" [level=3] [ref=e541]:
            - button "How do I verify a file download was triggered in Playwright?" [ref=e542] [cursor=pointer]:
              - text: How do I verify a file download was triggered in Playwright?
              - img [ref=e543]
  - region "Notifications alt+T"
  - contentinfo [ref=e545]:
    - contentinfo "Site footer" [ref=e546]:
      - generic [ref=e547]:
        - text: Footer Navigation
        - generic [ref=e548]:
          - generic [ref=e549]:
            - link "QA PlayGround" [ref=e550] [cursor=pointer]:
              - /url: /
              - generic [ref=e551]: QA PlayGround
            - paragraph [ref=e552]: A purpose-built practice platform for QA automation engineers. Learn Selenium, Playwright, and Cypress through hands-on interactive elements and real-world scenarios.
            - generic [ref=e553]:
              - generic [ref=e554]:
                - img [ref=e555]
                - text: Practice Elements
              - generic [ref=e560]:
                - img [ref=e561]
                - text: Bank Demo
              - generic [ref=e563]:
                - img [ref=e564]
                - text: Study Tracker
            - generic "Social media links" [ref=e566]:
              - link "YouTube" [ref=e567] [cursor=pointer]:
                - /url: https://www.youtube.com/@qaplayground
                - img [ref=e568]
              - link "GitHub" [ref=e570] [cursor=pointer]:
                - /url: https://github.com/kundalik-dev
                - img [ref=e571]
              - link "LinkedIn" [ref=e573] [cursor=pointer]:
                - /url: https://www.linkedin.com/in/kundalik-jadhav
                - img [ref=e574]
              - link "Twitter" [ref=e576] [cursor=pointer]:
                - /url: https://twitter.com/intent/tweet?url=https%3A%2F%2Fqaplayground.com
                - img [ref=e577]
              - link "Telegram" [ref=e579] [cursor=pointer]:
                - /url: https://t.me/share/url?url=https%3A%2F%2Fqaplayground.com
                - img [ref=e580]
          - generic [ref=e582]:
            - paragraph [ref=e583]: Platform
            - navigation "Platform links" [ref=e584]:
              - link "Practice Elements 22+ elements" [ref=e585] [cursor=pointer]:
                - /url: /practice
                - img [ref=e587]
                - generic [ref=e592]:
                  - text: Practice Elements
                  - generic [ref=e593]: 22+ elements
              - link "Bank Demo App E2E testing" [ref=e594] [cursor=pointer]:
                - /url: /bank
                - img [ref=e596]
                - generic [ref=e598]:
                  - text: Bank Demo App
                  - generic [ref=e599]: E2E testing
              - link "Study Tracker New" [ref=e600] [cursor=pointer]:
                - /url: /study-tracker/dashboard
                - img [ref=e602]
                - generic [ref=e604]:
                  - text: Study Tracker
                  - generic [ref=e605]: New
              - link "QA Tools Free" [ref=e606] [cursor=pointer]:
                - /url: /qa-tools
                - img [ref=e608]
                - generic [ref=e610]:
                  - text: QA Tools
                  - generic [ref=e611]: Free
              - link "QA Playground Bot Free" [ref=e612] [cursor=pointer]:
                - /url: https://t.me/QAPlayGround_Bot
                - img [ref=e614]
                - generic [ref=e616]:
                  - text: QA Playground Bot
                  - generic [ref=e617]: Free
              - link "QA Capture Extension" [ref=e618] [cursor=pointer]:
                - /url: https://chromewebstore.google.com/detail/jhgkhnokloeklnagbkgkgcfphafifefg?utm_source=item-share-cb
                - img [ref=e620]
                - generic [ref=e625]:
                  - text: QA Capture
                  - generic [ref=e626]: Extension
              - link "QA Playground Clipper Extension" [ref=e627] [cursor=pointer]:
                - /url: https://chromewebstore.google.com/detail/jegdkegbomfbmhhimfjgacdblcoodfpd?utm_source=item-share-cb
                - img [ref=e629]
                - generic [ref=e634]:
                  - text: QA Playground Clipper
                  - generic [ref=e635]: Extension
          - generic [ref=e636]:
            - paragraph [ref=e637]: Learn
            - navigation "Learn links" [ref=e638]:
              - link "Practice Elements" [ref=e639] [cursor=pointer]:
                - /url: /practice
              - link "Blog & Tutorials" [ref=e640] [cursor=pointer]:
                - /url: /blog
              - link "Free QA Tools" [ref=e641] [cursor=pointer]:
                - /url: /qa-tools
              - link "AI Syllabus Generator" [ref=e642] [cursor=pointer]:
                - /url: /study-tracker/ai-syllabus-prompt
              - link "Automation Framework" [ref=e643] [cursor=pointer]:
                - /url: https://github.com/kundalik5545/QA_PlayGround_Automation_Framework
          - generic [ref=e644]:
            - paragraph [ref=e645]: Company
            - navigation "Company links" [ref=e646]:
              - link "About Us" [ref=e647] [cursor=pointer]:
                - /url: /about-us
              - link "Contact Us" [ref=e648] [cursor=pointer]:
                - /url: /contact-us
              - link "Raise an Issue" [ref=e649] [cursor=pointer]:
                - /url: /raise-issue
              - link "Privacy Policy" [ref=e650] [cursor=pointer]:
                - /url: /privacy-policy
              - link "Login" [ref=e651] [cursor=pointer]:
                - /url: /login
            - generic [ref=e652]:
              - paragraph [ref=e653]: "*No account required. Creating a login is entirely optional and is only necessary if you wish to sync your progress in the Study Tracker."
              - paragraph [ref=e654]: "*Your data is stored locally within your browser for maximum privacy."
        - generic [ref=e655]:
          - generic [ref=e656]: © 2026 QA Playground. All rights reserved.
          - generic [ref=e657]:
            - text: Built for QA Engineers by
            - link "Kundalik Jadhav" [ref=e658] [cursor=pointer]:
              - /url: https://github.com/kundalik-dev
  - alert [ref=e659]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import path from 'path';
  3  | import fs from 'fs';
  4  | 
  5  | const baseUrl: string = 'https://the-internet.herokuapp.com/windows';
  6  | 
  7  | test("Handle new Tabs, multiple pages ", { tag: '@sanity' }, async ({ page, context }) => {
  8  |     await page.goto(baseUrl);
  9  |     const pageCount = context.pages().length;
  10 |     expect(pageCount).toEqual(1);
  11 |     console.log("Number of tabs before going to any pages: ")
  12 | 
  13 |     // capture the number of events
  14 |     const [newPage] = await Promise.all([
  15 |         context.waitForEvent('page'),
  16 |         page.getByText("Click Here").click()
  17 |     ]);
  18 | 
  19 |     // wait for the new tab to load
  20 |     await newPage.waitForLoadState();
  21 |     //get all open pages
  22 |     const allPages = context.pages();
  23 |     console.log("All pages: ", allPages.length);
  24 |     const title = await newPage.getByText("New Window").textContent();
  25 |     expect(title).toEqual("New Window");
  26 |     await newPage.close();
  27 |     expect(page).toHaveURL(/windows/);
  28 |     console.log(`Current page: ${page.url()}`)
  29 | 
  30 | });
  31 | 
  32 | test("Handle file upload", { tag: '@smoke' }, async ({ page }) => {
  33 | 
  34 |     const folderPath = path.join(__dirname, 'testdata', 'test.txt');
  35 |     console.log("The file path:", folderPath);
  36 |     fs.mkdirSync(path.join(__dirname, 'testdata'), { recursive: true });
  37 |     fs.writeFileSync(folderPath, 'I am fed up with you');
  38 |     const data = fs.readFileSync(folderPath, 'utf-8');
  39 | 
  40 |     console.log("The file is:", data);
  41 |     await page.goto('https://qaplayground.com/practice/file-upload/');
  42 |     console.log(await page.locator("[name='file-upload']").textContent());
  43 |     await page.locator("[name='file-upload']").setInputFiles('testdata/test.txt');
  44 |     const message = await page.getByText("File selected:").textContent();
  45 |     expect(message).toContain("test.txt");
  46 |     await expect(page.locator("[name='file-upload']")).toHaveCount(1);
  47 |     await page.locator('#file-upload').setInputFiles([]);
  48 |     await expect(page.locator('#file-upload')).toHaveValue('');
  49 | });
  50 | 
  51 | test("Handle file download", { tag: "@smoke" }, async ({ page }) => {
  52 |     await page.goto('https://qaplayground.com/practice/file-upload/');
  53 | 
  54 | 
  55 |     const [download] = await Promise.all([
  56 |         page.waitForEvent("download"),
  57 |         page.getByRole('button', {
  58 |             name: /Download PDF/
  59 | 
  60 |         }).click(),
  61 |     ]);
  62 | 
  63 |     await download.saveAs('./downloads/' + download.suggestedFilename());
  64 |     console.log(`Downloaded: ${download.suggestedFilename()}`)
> 65 |     expect(download.suggestedFilename()).toContain(/test.pdf/);
     |                                          ^ TypeError: expect(test.pdf).toContain(/test.pdf/) // indexOf
  66 | 
  67 | 
  68 | })
  69 | 
  70 | 
```