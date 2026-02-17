from automation import FileHelper

FileHelper.replace_substring(
    rf"app\helpers\PageWrapper.tsx",
    rf"const defaultPage = Pages\.(.*?);",
    rf"const defaultPage = Pages.Main;",
)
