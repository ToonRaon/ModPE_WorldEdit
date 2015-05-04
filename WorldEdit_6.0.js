/*
 * 월드에딧 스크립트 6.0
 * 제작 : 툰라온
 * 무단 수정 및 2차 배포 금지
 * Github : https://raw.githubusercontent.com/ToonRaon/ModPE_WorldEdit/
 */
 
 //import
const Toast = android.widget.Toast;
const LinearLayout = android.widget.LinearLayout;
const RelativeLayout = android.widget.RelativeLayout;
const Button = android.widget.Button;
const PopupWindow = android.widget.PopupWindow;
const ImageView = android.widget.ImageView;
const TextView = android.widget.TextView;
const EditText = android.widget.EditText;

const SP = android.util.TypedValue.COMPLEX_UNIT_SP;

const Gravity = android.view.Gravity;
const MotionEvent =	android.view.MotionEvent;

//const View = android.view.View;
const OnClickListener = android.view.View.OnClickListener;
const OnLongClickListener = android.view.View.OnLongClickListener;
const OnTouchListener = android.view.View.OnTouchListener;

const Bitmap = android.graphics.Bitmap;
const BitmapFactory = android.graphics.BitmapFactory;
const Drawable = android.graphics.drawable.Drawable;
const BitmapDrawable = android.graphics.drawable.BitmapDrawable;
const Color = android.graphics.Color;
const Rect = android.graphics.Rect;
const NinePatchDrawable = android.graphics.drawable.NinePatchDrawable;

const Runnable = java.lang.Runnable;
const Thread = java.lang.Thread;

const URL = java.net.URL;

const Uri = android.net.Uri;
const ConnectivityManager = android.net.ConnectivityManager;

const File = java.io.File;
const BufferedReader = java.io.BufferedReader;
const InputStreamReader = java.io.InputStreamReader;
const FileInputStream = java.io.FileInputStream;
const FileOutputStream = java.io.FileOutputStream;
const OutputStreamWriter = java.io.OutputStreamWriter;

const AlertDialog = android.app.AlertDialog;
const ProgressDialog = android.app.ProgressDialog;
const DownloadManager = android.app.DownloadManager;

const DialogInterface = android.content.DialogInterface;
const BroadcastReceiver = 	android.content.BroadcastReceiver;
const IntentFilter = android.content.IntentFilte;
const Intent = android.content.Intent;

const InputType = android.text.InputType;

//상수 선언
const CTX = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

const CURRENT_MAJOR_VERSION = 6;
const CURRENT_MINOR_VERSION = 0;

const VERSION_CHECK_URL = "https://raw.githubusercontent.com/ToonRaon/ModPE_WorldEdit/master/lastest_version.txt";
const LASTEST_MAJOR_VERSION = (getInternetStatus() != "Offline") ? parseInt(readURL(VERSION_CHECK_URL, "array")[0].split("M_version=")[1]) : null;
const LASTEST_MINOR_VERSION = (getInternetStatus() != "Offline") ? parseInt(readURL(VERSION_CHECK_URL, "array")[1].split("m_version=")[1]) : null;

const CHANGE_LOG_URL = "https://raw.githubusercontent.com/ToonRaon/ModPE_WorldEdit/master/change_log.txt";

const NOTICE_FILE_URL = "https://raw.githubusercontent.com/ToonRaon/ModPE_WorldEdit/master/notice.txt";

const SD_CARD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const RESOURCE_PATH = SD_CARD + "/games/com.mojang/worldedit/";
const IMAGE_PATH = RESOURCE_PATH + "images/";
const GUI_PATH = IMAGE_PATH + "gui/";
const ITEM_PATH = IMAGE_PATH + "items/";
const ENTITY_PATH = IMAGE_PATH + "entities/";
const OPTION_PATH = RESOURCE_PATH + "option/";

const OPTION_FILE = OPTION_PATH + "options.txt";

const INITIAL = 19; //초성 - ㄱ, ㄲ, ㄴ, ㄷ, ㄸ, ㄹ, ㅁ, ㅂ, ㅃ, ㅅ, ㅆ, ㅇ, ㅈ, ㅉ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ
const MEDIAL = 21; //중성 - ㅏ, ㅐ, ㅑ, ㅒ, ㅓ, ㅔ, ㅕ, ㅖ, ㅗ, ㅘ, ㅙ, ㅚ, ㅛ, ㅜ, ㅝ, ㅞ, ㅟ, ㅠ, ㅡ, ㅢ,ㅣ
const FINAL = 28; //종성 - (없음), ㄱ, ㄲ, ㄳ, ㄴ, ㄵ, ㄶ, ㄷ, ㄹ, ㄺ, ㄻ, ㄼ, ㄽ, ㄾ, ㄿ, ㅀ, ㅁ, ㅂ, ㅄ, ㅅ, ㅆ, ㅇ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ
const FIRST_KOREAN_OF_UNICODE = 44032; //유니코드에서 첫번째 한글 문자인 '가'의 고유번호. 44033은 각, 44034는 갂... 과 같은 순서로 55203번째까지 한글이 존재하고있다.

const RESOURCE_FILES_LIST = [
	//images 폴더 - index 0
	[
		".nomedia"
	],
	//gui 폴더 - index 1
	[
		"main_icon.png",
		"table.png",
		"prev_button_on.png",
		"prev_button_off.png",
		"next_button_on.png",
		"next_button_off.png",
		"slot.png"
	],
	//items 폴더 - index 2
	[
		"0-0.png", "1-0.png", "1-1.png", "1-2.png", "1-3.png", "1-4.png", "1-5.png", "1-6.png", "2-0.png", "3-0.png",
		"3-1.png", "3-2.png", "4-0.png", "5-0.png", "5-1.png", "5-2.png", "5-3.png", "5-4.png", "5-5.png", "6-0.png",
		"6-1.png", "6-2.png", "6-3.png", "6-4.png", "6-5.png", "7-0.png", "8-0.png", "9-0.png", "10-0.png", "11-0.png",
		"12-0.png", "12-1.png", "13-0.png", "14-0.png", "15-0.png", "16-0.png", "17-0.png", "17-1.png", "17-2.png", "17-3.png",
		"18-0.png", "18-1.png", "18-2.png", "18-3.png", "19-0.png", "20-0.png", "21-0.png", "22-0.png", "24-0.png", "24-1.png",
		"24-2.png", "27-0.png", "27-1.png", "30-0.png", "31-0.png", "31-1.png", "31-2.png", "32-0.png", "35-0.png", "35-1.png",
		"35-2.png", "35-3.png", "35-4.png", "35-5.png", "35-6.png", "35-7.png", "35-8.png", "35-9.png", "35-10.png", "35-11.png",
		"35-12.png", "35-13.png", "35-14.png", "35-15.png", "37-0.png", "38-0.png", "38-1.png", "38-2.png", "38-3.png", "38-4.png",
		"38-5.png", "38-6.png", "38-7.png", "38-8.png", "39-0.png", "40-0.png", "41-0.png", "42-0.png", "43-0.png", "43-1.png",
		"43-2.png", "43-3.png", "43-4.png", "43-5.png", "43-6.png", "44-0.png", "44-1.png", "44-2.png", "44-3.png", "44-4.png",
		"44-5.png", "44-6.png", "45-0.png", "46-0.png", "47-0.png", "48-0.png", "49-0.png", "50-0.png", "51-0.png", "52-0.png",
		"53-0.png", "54-0.png", "56-0.png", "57-0.png", "58-0.png", "59-0.png", "59-1.png", "59-2.png", "59-3.png", "59-4.png",
		"59-5.png", "59-6.png", "59-7.png", "60-0.png", "60-7.png", "61-0.png", "62-0.png", "63-0.png", "64-0.png", "65-0.png",
		"66-0.png", "67-0.png", "68-0.png", "71-0.png", "73-0.png", "74-0.png", "78-0.png", "79-0.png", "80-0.png", "81-0.png",
		"82-0.png", "83-0.png", "85-0.png", "85-1.png", "85-2.png", "85-3.png", "85-4.png", "85-5.png", "86-0.png", "87-0.png",
		"89-0.png", "91-0.png", "92-0.png", "95-0.png", "96-0.png", "97-0.png", "98-0.png", "99-0.png", "100-0.png", "100-14.png",
		"101-0.png", "102-0.png", "103-0.png", "104-0.png", "104-1.png", "104-2.png", "104-3.png", "104-4.png", "104-5.png", "104-6.png",
		"104-7.png", "105-0.png", "105-1.png", "105-2.png", "105-3.png", "105-4.png", "105-5.png", "105-6.png", "105-7.png", "106-0.png",
		"107-0.png", "108-0.png", "109-0.png", "110-0.png", "111-0.png", "112-0.png", "114-0.png", "120-0.png", "121-0.png", "126-0.png",
		"127-0.png", "128-0.png", "129-0.png", "133-0.png", "134-0.png", "135-0.png", "136-0.png", "139-0.png", "139-1.png", "141-0.png",
		"141-1.png", "141-2.png", "141-3.png", "141-4.png", "141-5.png", "141-6.png", "141-7.png", "142-0.png", "142-1.png", "142-2.png",
		"142-3.png", "142-4.png", "142-5.png", "142-6.png", "142-7.png", "155-0.png", "156-0.png", "157-0.png", "157-1.png", "157-2.png",
		"157-3.png", "157-4.png", "157-5.png", "158-0.png", "158-1.png", "158-2.png", "158-3.png", "158-4.png", "158-5.png", "159-0.png",
		"159-1.png", "159-2.png", "159-3.png", "159-4.png", "159-5.png", "159-6.png", "159-7.png", "159-8.png", "159-9.png", "159-10.png",
		"159-11.png", "159-12.png", "159-13.png", "159-14.png", "159-15.png", "161-0.png", "161-1.png", "162-0.png", "162-1.png", "163-0.png",
		"164-0.png", "170-0.png", "171-0.png", "171-1.png", "171-2.png", "171-3.png", "171-4.png", "171-5.png", "171-6.png", "171-7.png",
		"171-8.png", "171-9.png", "171-10.png", "171-11.png", "171-12.png", "171-13.png", "171-14.png", "171-15.png", "172-0.png", "173-0.png",
		"174-0.png", "183-0.png", "184-0.png", "185-0.png", "186-0.png", "187-0.png", "243-0.png", "244-0.png", "244-1.png", "244-2.png",
		"244-3.png", "244-4.png", "244-5.png", "244-6.png", "244-7.png", "245-0.png", "246-0.png", "247-0.png", "247-1.png", "247-2.png",
		"248-0.png", "249-0.png", "255-0.png", "256-0.png", "257-0.png", "258-0.png", "259-0.png", "260-0.png", "261-0.png", "262-0.png",
		"263-0.png", "263-1.png", "264-0.png", "265-0.png", "266-0.png", "267-0.png", "268-.png", "268-0.png", "269-0.png", "270-0.png",
		"271-0.png", "272-0.png", "273-0.png", "274-0.png", "275-0.png", "276-0.png", "277-0.png", "278-0.png", "279-0.png", "280-0.png",
		"281-0.png", "282-0.png", "283-0.png", "284-0.png", "285-0.png", "286-0.png", "287-0.png", "288-0.png", "289-0.png", "290-0.png",
		"291-0.png", "292-0.png", "293-0.png", "294-0.png", "295-0.png", "296-0.png", "297-0.png", "298-0.png", "299-0.png", "300-0.png",
		"301-0.png", "302-0.png", "303-0.png", "304-0.png", "305-0.png", "306-0.png", "307-0.png", "308-0.png", "309-0.png", "310-0.png",
		"311-0.png", "312-0.png", "313-0.png", "314-0.png", "315-0.png", "316-0.png", "317-0.png", "318-0.png", "319-0.png", "320-0.png",
		"321-0.png", "323-0.png", "324-0.png", "325-0.png", "326-0.png", "327-0.png", "328-0.png", "329-0.png", "330-0.png", "331-0.png",
		"332-0.png", "334-0.png", "335-0.png", "336-0.png", "337-0.png", "338-0.png", "339-0.png", "340-0.png", "341-0.png", "344-0.png",
		"345-0.png", "347-0.png", "348-0.png", "351-0.png", "351-1.png", "351-2.png", "351-3.png", "351-4.png", "351-5.png", "351-6.png",
		"351-7.png", "351-8.png", "351-9.png", "351-10.png", "351-11.png", "351-12.png", "351-13.png", "351-14.png", "351-15.png", "352-0.png",
		"353-0.png", "354-0.png", "355-0.png", "357-0.png", "359-0.png", "360-0.png", "361-0.png", "362-0.png", "363-0.png", "364-0.png",
		"365-0.png", "366-0.png", "367-0.png", "383-10.png", "383-12.png", "383-13.png", "383-14.png", "383-15.png", "383-16.png", "383-32.png",
		"383-33.png", "383-34.png", "383-35.png", "383-36.png", "383-37.png", "383-38.png", "383-39.png", "388-0.png", "391-0.png", "392-0.png",
		"393-0.png", "400-0.png", "405-0.png", "406-0.png", "457-0.png", "458-0.png", "459-0.png", "no_image.png"
	],
	//entites 폴더 - index 3
	[
		"10.png",
		"11.png",
		"12.png",
		"13.png",
		"14.png",
		"15.png",
		"16.png",
		"32.png",
		"33.png",
		"34.png",
		"35.png",
		"36.png",
		"37.png",
		"38.png",
		"39.png",
		"64.png",
		"65.png",
		"66.png",
		"80.png",
		"81.png",
		"83.png",
		"84.png"
	]
];

const AXE_BUTTON_ID = 100;
const CMD_BUTTON_ID = 101;
const TABLE_ID = 1000;

//GUI 선언
var shortcutWindow;

var commandDialog;

var GUIWindow;

//변수 선언
var firstPoint = {x: null, y: null, z: null};
var secondPoint = {x: null, y: null, z: null};

var canItemSelect = false;
var selectedCommand, selectedItemId, selectedItemData;
var fromId, fromData;
var toId, toData;

var minPoint = {x: null, y: null, z: null};
var maxPoint = {x: null, y: null, z: null};

var content;

var clipboard;

var radius = 0;
var height = 0;

var backupPoint = new Array(3);
var backupLength = new Array(3);
var backupCount = 0;
var backupBlock = new Array();

//var progressDialog;

var commandDetector = false;

var isScriptable = false;

var checkFilesThread;
var makeGUIWindowThread;

/* ---------------------------------------------------------------------------- ModPE Functions ---------------------------------------------------------------------------- */

function selectLevelHook() {
	if(!isScriptable) //파일 누락 등의 이유로 스크립트 사용불가 상태
			return;
	
}

function newLevel() {
	if(!isScriptable) //파일 누락 등의 이유로 스크립트 사용불가 상태
			return;
	
	//공지사항
	notice();
	
	//단축버튼
	showWindow(shortcutWindow, Gravity.RIGHT | Gravity.TOP, 0, dip2px(70));
}

function leaveGame() {
	if(!isScriptable) //파일 누락 등의 이유로 스크립트 사용불가 상태
			return;
	
	closeWindow(shortcutWindow);
}

function useItem(x, y, z, item, block, side, itemData, blockData) {
	if(!isScriptable) //파일 누락 등의 이유로 스크립트 사용불가 상태
			return;
	
	if(item == 271) { //나무도끼
		preventDefault();
		setPoint(x, y, z, firstPoint, block, blockData);
	}
}

function procCmd(command) {
	if(!isScriptable) //파일 누락 등의 이유로 스크립트 사용불가 상태
			return;
	
	clientMessage(command);
	command = command.split(" ");
	
	switch(command[0]) {
		case "채":
			fill(comparePoint(0), comparePoint(1), parseInt(command[1]), parseInt(command[2]));
			break;
	}
}

function startDestroyBlock(x, y, z, side) {
	if(!isScriptable) //파일 누락 등의 이유로 스크립트 사용불가 상태
			return;
	
	var item = Player.getCarriedItem();
	var block = Level.getTile(x, y, z);
	var blockData = Level.getData(x, y, z);
	
	if(item == 271) //나무도끼
		setPoint(x, y, z, secondPoint, block, blockData);
}

function destroyBlock() {
	if(!isScriptable) //파일 누락 등의 이유로 스크립트 사용불가 상태
			return;
	
	var item = Player.getCarriedItem();
	
	if(item == 271) //나무도끼
		preventDefault();
}

function modTick() {
	if(!isScriptable) //파일 누락 등의 이유로 스크립트 사용불가 상태
			return;
	
	if(commandDetector) { //에딧 함수 발동 여부 감지
		commandDetector = false;
		
		commandHandler(selectedCommand);
	}
}

/* ---------------------------------------------------------------------------- Custom Functions ---------------------------------------------------------------------------- */

function initialize() {
	new Thread(new Runnable() {
		run: function() {
			try {
				//폴더 체크
				checkDirectoris();
				
				//파일 체크
				checkFiles(); 
				checkFilesThread.join();
				
				if(isScriptable) { //리소스 파일 존재
					//단축버튼 생성
					makeShortcutWindow();
					
					//GUI 생성
					makeGUIWindow();
					makeGUIWindowThread.join();
					
					//버전 확인
					checkVersion();
				}
			} catch(e) {
				toast("initialize 과정에서 오류가 발생하였습니다.\n" + e, 1);
			}
		}
	}).start();
}
initialize();

function checkVersion() {
	try {
		if(LASTEST_MAJOR_VERSION == null || LASTEST_MINOR_VERSION == null) { //인터넷 연결 상태 불량
			toast("인터넷에 연결되어있지않아 최신버전의 정보를 불러올 수 없습니다.", 1);
			return;
		}
		
		if((CURRENT_MAJOR_VERSION < LASTEST_MAJOR_VERSION) || (CURRENT_MAJOR_VERSION == LASTEST_MAJOR_VERSION && CURRENT_MINOR_VERSION < LASTEST_MINOR_VERSION)) { //최신버전이 아닌 경우
			var listener = new DialogInterface.OnClickListener({
				onClick: function(dialog, which) {
					switch(which) {
						case DialogInterface.BUTTON_POSITIVE: //제작자 블로그
							internet("http://blog.naver.com/PostList.nhn?blogId=toonraon&from=postList&categoryNo=26");
							break;
						
						case DialogInterface.BUTTON_NEUTRAL: //다시 보지않음
							saveOption("do_not_show_dialog_new_version_is_launched_anymore", LASTEST_MAJOR_VERSION + "." + LASTEST_MINOR_VERSION);
							toast("더이상 새 버전에 대한 알림을 받지않습니다.", 1);
							break;
						
						case DialogInterface.BUTTON_NEGATIVE: //닫기
							break;
					}
				}
			});
			
			if(loadOption("do_not_show_dialog_new_version_is_launched_anymore") != (LASTEST_MAJOR_VERSION + "." + LASTEST_MINOR_VERSION))
				alertDialog("알 림", "현재 버전보다 상위버전이 출시되었습니다. 제작자 블로그 또는 MCPE KOREA 카페를 통해 업데이트하는 것을 권장합니다.\n최신버전: " + LASTEST_MAJOR_VERSION + "." + LASTEST_MINOR_VERSION + "\n사용버전: " + CURRENT_MAJOR_VERSION + "." + CURRENT_MINOR_VERSION + "\n\n" + readURL(CHANGE_LOG_URL), listener, "제작자 블로그", "다시 보지않음", "닫기");
		} else {
			var listener = new DialogInterface.OnClickListener({
				onClick: function(dialog, which) {
					switch(which) {
						case DialogInterface.BUTTON_POSITIVE: //확인
							break;
						
						case DialogInterface.BUTTON_NEGATIVE: //다시 보지않음
							saveOption("do_not_show_dialog_current_version_is_lastest_anymore", LASTEST_MAJOR_VERSION + "." + LASTEST_MINOR_VERSION);
							toast("다음 업데이트까지 알림을 끕니다.", 1);
							break;
					}
				}
			});
			
			if(loadOption("do_not_show_dialog_current_version_is_lastest_anymore") != (CURRENT_MAJOR_VERSION + "." + CURRENT_MINOR_VERSION))
				alertDialog("알 림", "이미 최신버전입니다.\n현재버전: " + CURRENT_MAJOR_VERSION + "." +  CURRENT_MINOR_VERSION, listener, "확인", null, "다시 보지않음");
		}
	} catch(e) {
		toast("버전을 불러오는 데 실패하였습니다.\n" + e, 1);
	}
}

function checkDirectoris() {
	try {
		//폴더 생성//최상위 리소스 폴더
		if(!File(RESOURCE_PATH).exists())
			File(RESOURCE_PATH).mkdirs();
		
		//이미지 리소스 폴더
		if(!File(IMAGE_PATH).exists())
			File(IMAGE_PATH).mkdirs();
		
		//GUI 리소스 폴더
		if(!File(GUI_PATH).exists())
			File(GUI_PATH).mkdirs();
		
		//아이템 리소스 폴더
		if(!File(ITEM_PATH).exists())
			File(ITEM_PATH).mkdirs();
		
		//엔티티 리소스 폴더
		if(!File(ENTITY_PATH).exists())
			File(ENTITY_PATH).mkdirs();
		
		//옵션 폴더
		if(!File(OPTION_PATH).exists())
			File(OPTION_PATH).mkdirs();
		
		//옵션 파일
		if(!File(OPTION_FILE).exists())
			File(OPTION_FILE).createNewFile(); //options.txt
	} catch(e) {
		toast("리소스 폴더를 생성하는 과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function checkFiles() {
	try {
		checkFilesThread = new Thread(new Runnable() {
			run: function() {
				try {
					var progressDialog;
					CTX.runOnUiThread(new Runnable() {
						run: function() {
							progressDialog = ProgressDialog.show(CTX, "파일을 체크 중입니다...", "잠시만 기다려주세요...", true, false);
						}
					});
					
					const NOMEDIA_FOLDER_LENGTH = Number(RESOURCE_FILES_LIST[0].length);
					const GUI_FOLDER_LENGTH = Number(RESOURCE_FILES_LIST[1].length);
					const ITEMS_FOLDER_LENGTH = Number(RESOURCE_FILES_LIST[2].length);
					const ENTITISE_FOLDER_LENGTH = Number(RESOURCE_FILES_LIST[3].length);
					
					var isDownloadAllowed = false;
					var threadFreezer = false;
					var isFilesExisted = true;
					
					//파일 다운로드 다이얼로그
					var listener = new DialogInterface.OnClickListener({
						onClick: function(dialog, which) {
							switch(which) {
								case DialogInterface.BUTTON_POSITIVE:
									if(getInternetStatus() != "Offline") { //온라인 상태
										isDownloadAllowed = true;
										threadFreezer = false;
									} else { //오프라인 상태
										alertDialog("네트워크 연결 오류!", "현재 네트워크에 연결되어있지 않아 파일을 다운로드 할 수 없습니다.\n네트워크 연결 상태를 다시 확인한 후 시도해주세요.\n파일을 다운로드하지않으면 스크립트 사용이 불가능합니다.", null, "확인", null, null);
										
										isDownloadAllowed = false;
										isScriptable = false;
										threadFreezer = false;
										isFilesExisted = false;
									}
									break;
								
								case DialogInterface.BUTTON_NEGATIVE:
									isDownloadAllowed = false;
									isScriptable = false;
									threadFreezer = false;
									isFilesExisted = false;
									toast("파일 다운로드가 거부되었습니다.\n월드에딧 스크립트 사용이 불가능합니다.");
									break;
							}
						}
					});
					
					var dialog = new AlertDialog.Builder(CTX);
					dialog.setTitle("누락된 파일이 존재합니다.");
					dialog.setMessage(
						"다운로드 되지 않은 리소스 파일(이미지나 소리 파일 등)이 발견되었습니다.\n" +
						"월드에딧 스크립트는 많은 양의 리소스 파일에 의존하고 있습니다.\n" +
						"따라서 리소스 파일이 없을 경우에 스크립트 사용이 불가능합니다.\n" +
						"\n" +
						((getInternetStatus() == "Offline") ?
							//오프라인 상태
							("현재 인터넷에 연결되어있지 않습니다.\n" +
							"인터넷 상태를 확인한 후 시도해주세요.") :
							((getInternetStatus() == "Data") ?
								//3G, 4G
								("파일을 다운로드 받으시겠습니까?\n" +
								"현재 3G 혹은 4G로 인터넷에 연결하고 있습니다.\n" +
								"이 상태로 파일을 다운로드하시겠습니까?\n" +
								"\n" +
								"사용 요금제에 따라 요금이 부과될 수 있습니다.") :
								//WiFi
								("파일을 다운로드 받으시겠습니까?\n" +
								"현재 WiFi로 인터넷에 연결하고 있습니다.\n" +
								"파일을 다운로드하시겠습니까?")
							)
						)
					);
					dialog.setPositiveButton("설치", listener);
					dialog.setNegativeButton("취소", listener);
					dialog.setCancelable(false);
					
					//리소스 파일 리스트
					var nomediaFile = File(IMAGE_PATH + ".nomedia");
					var GUIFiles = File(GUI_PATH).list();
					var itemFiles = File(ITEM_PATH).list();
					var entityFiles = File(ENTITY_PATH).list();
					
					//convert Java string array to javascript string array
					var convertedGUIFilesArray = new Array();
					var convertedItemFilesArray = new Array();
					var convertedEntityFilesArray = new Array();
					
					for each(var i in GUIFiles)
						convertedGUIFilesArray.push(i + "");
					for each(var i in itemFiles)
						convertedItemFilesArray.push(i + "");
					for each(var i in entityFiles)
						convertedEntityFilesArray.push(i + "");
					
					//.nomedia 파일
					if(!nomediaFile.exists()) {
						i = Number(i); //i를 강제형변환하지 않으면 NOMEDIA_FOLDER_LENGTH = 1이고 i = 0일 때 NOMEDIA_FOLDER_LENGTH + i = 10과 같은 결과가 나옴 
						
						if(!isDownloadAllowed) { //사용자로부터 다운로드를 허락 받지 못한 상태
							threadFreezer = true;
							CTX.runOnUiThread(new Runnable() {
								run: function() {
									if(!dialog.create().isShowing()) //isShowing() 메서드는 AlertDialog 객체의 메소드이므로 AlertDialog.Builder를 create() 시켜서 AlertDialog 객체 생성
									dialog.create().show();
								}
							});
							
							while(threadFreezer) { //사용자로부터 응답이 올 때까지 쓰레드 프리징
								Thread.sleep(10);
							}
						}
						
						if(isDownloadAllowed) { //파일 다운로드 허용
							CTX.runOnUiThread(new Runnable() {
									run: function() {
																				progressDialog.setMessage("파일 다운로드 중... " + ((i / (NOMEDIA_FOLDER_LENGTH + GUI_FOLDER_LENGTH + ITEMS_FOLDER_LENGTH + ENTITISE_FOLDER_LENGTH)) * 100).toFixed(2) + "%\n" + ".nomedia");
									}
								});
							downloadFileFromURL("https://raw.githubusercontent.com/ToonRaon/ModPE_WorldEdit/version-" + CURRENT_MAJOR_VERSION + "." + CURRENT_MINOR_VERSION + "/images/" + ".nomedia", IMAGE_PATH, ".nomedia");
							Thread.sleep(5);
						} else { //파일 다운로드 거부
							CTX.runOnUiThread(new Runnable() {
								run: function() {
									progressDialog.dismiss();
									progressDialog = null;
								}
							});
							return;
						}
					}
					//GUI 폴더
					for(var i in RESOURCE_FILES_LIST[1]) {
						i = Number(i); //i를 강제형변환하지 않으면 NOMEDIA_FOLDER_LENGTH = 1이고 i = 0일 때 NOMEDIA_FOLDER_LENGTH + i = 10과 같은 결과가 나옴 
						
						if(convertedGUIFilesArray.indexOf(RESOURCE_FILES_LIST[1][i]) == -1) { //gui 폴더에서 누락된 파일 발견 시
							if(!isDownloadAllowed) { //사용자로부터 다운로드를 허락 받지 못한 상태
								threadFreezer = true;
								CTX.runOnUiThread(new Runnable() {
									run: function() {
										if(!dialog.create().isShowing())
											dialog.create().show();
									}
								});
								
								while(threadFreezer) { //사용자로부터 응답이 올 때까지 쓰레드 프리징
									Thread.sleep(10);
								}
							}
							
							if(isDownloadAllowed) { //파일 다운로드 허용
								CTX.runOnUiThread(new Runnable() {
									run: function() {
																				progressDialog.setMessage("파일 다운로드 중... " + (((NOMEDIA_FOLDER_LENGTH + i) / (NOMEDIA_FOLDER_LENGTH + GUI_FOLDER_LENGTH + ITEMS_FOLDER_LENGTH + ENTITISE_FOLDER_LENGTH)) * 100).toFixed(2) + "%\n" + RESOURCE_FILES_LIST[1][i]);
									}
								});
								downloadFileFromURL("https://raw.githubusercontent.com/ToonRaon/ModPE_WorldEdit/version-" + CURRENT_MAJOR_VERSION + "." + CURRENT_MINOR_VERSION + "/images/gui/" + RESOURCE_FILES_LIST[1][i], GUI_PATH, RESOURCE_FILES_LIST[1][i]);
								Thread.sleep(5);
							} else { //파일 다운로드 거부
								CTX.runOnUiThread(new Runnable() {
									run: function() {
										progressDialog.dismiss();
										progressDialog = null;
									}
								});
								return;
							}
						}
					}
					//items 폴더
					for(var i in RESOURCE_FILES_LIST[2]) {
						i = Number(i); //i를 강제형변환하지 않으면 NOMEDIA_FOLDER_LENGTH = 1이고 i = 0일 때 NOMEDIA_FOLDER_LENGTH + i = 10과 같은 결과가 나옴 
						
						if(convertedItemFilesArray.indexOf(RESOURCE_FILES_LIST[2][i]) == -1) { //items 폴더에서 누락된 파일 발견 시
							if(!isDownloadAllowed) { //사용자로부터 다운로드를 허락 받지 못한 상태
								threadFreezer = true;
								CTX.runOnUiThread(new Runnable() {
									run: function() {
										if(!dialog.create().isShowing())
											dialog.create().show();
									}
								});
								
								while(threadFreezer) { //사용자로부터 응답이 올 때까지 쓰레드 프리징
									Thread.sleep(10);
								}
							}
							
							if(isDownloadAllowed) { //파일 다운로드 허용
								CTX.runOnUiThread(new Runnable() {
									run: function() {
										progressDialog.setMessage("파일 다운로드 중... " + (((NOMEDIA_FOLDER_LENGTH + GUI_FOLDER_LENGTH + i) / (NOMEDIA_FOLDER_LENGTH + GUI_FOLDER_LENGTH + ITEMS_FOLDER_LENGTH + ENTITISE_FOLDER_LENGTH)) * 100).toFixed(2) + "%\n" + RESOURCE_FILES_LIST[2][i]);
									}
								});
								downloadFileFromURL("https://raw.githubusercontent.com/ToonRaon/ModPE_WorldEdit/version-" + CURRENT_MAJOR_VERSION + "." + CURRENT_MINOR_VERSION + "/images/items/" + RESOURCE_FILES_LIST[2][i], ITEM_PATH, RESOURCE_FILES_LIST[2][i]);
								Thread.sleep(5);
							} else { //파일 다운로드 거부
								CTX.runOnUiThread(new Runnable() {
									run: function() {
										progressDialog.dismiss();
										progressDialog = null;
									}
								});
								return;
							}
						}
					}
					//entities 폴더
					for(var i in RESOURCE_FILES_LIST[3]) {
						i = Number(i); //i를 강제형변환하지 않으면 NOMEDIA_FOLDER_LENGTH = 1이고 i = 0일 때 NOMEDIA_FOLDER_LENGTH + i = 10과 같은 결과가 나옴 
						
						if(convertedEntityFilesArray.indexOf(RESOURCE_FILES_LIST[3][i]) == -1) { //entities 폴더에서 누락된 파일 발견 시
							if(!isDownloadAllowed) { //사용자로부터 다운로드를 허락 받지 못한 상태
								threadFreezer = true;
								CTX.runOnUiThread(new Runnable() {
									run: function() {
										if(!dialog.create().isShowing())
											dialog.create().show();
									}
								});
								
								while(threadFreezer) { //사용자로부터 응답이 올 때까지 쓰레드 프리징
									Thread.sleep(10);
								}
							}
							
							if(isDownloadAllowed) { //파일 다운로드 허용
								CTX.runOnUiThread(new Runnable() {
									run: function() {
																				progressDialog.setMessage("파일 다운로드 중... " + (((NOMEDIA_FOLDER_LENGTH + GUI_FOLDER_LENGTH + ITEMS_FOLDER_LENGTH + i) / (NOMEDIA_FOLDER_LENGTH + GUI_FOLDER_LENGTH + ITEMS_FOLDER_LENGTH + ENTITISE_FOLDER_LENGTH)) * 100).toFixed(2) + "%\n" + RESOURCE_FILES_LIST[3][i]);
									}
								});
								downloadFileFromURL("https://raw.githubusercontent.com/ToonRaon/ModPE_WorldEdit/version-" + CURRENT_MAJOR_VERSION + "." + CURRENT_MINOR_VERSION + "/images/entities/" + RESOURCE_FILES_LIST[3][i], ENTITY_PATH, RESOURCE_FILES_LIST[3][i]);
								Thread.sleep(5);
							} else { //파일 다운로드 거부
								CTX.runOnUiThread(new Runnable() {
									run: function() {
										progressDialog.dismiss();
										progressDialog = null;
									}
								});
								return;
							}
						}
					}
					
					if(isFilesExisted) { //모든 파일이 존재하는 경우
						isScriptable = true;
					}
					
					while(isDownloadAllowed) { //파일을 다운로드 하는 경우
						if((File(ITEM_PATH).list().length == RESOURCE_FILES_LIST[2].length) && (File(GUI_PATH).list().length == RESOURCE_FILES_LIST[1].length) && (File(ENTITY_PATH).list().length == RESOURCE_FILES_LIST[3].length)) { //registerReceiver(ctx, intent)를 통해 다운로드 완료여부를 체크하려고 하였으나 실패하여 로컬 저장소의 파일 개수를 비교하여 다운로드 완료여부 확인
							Thread.sleep(3000); //안정성을 위해 3초의 텀을 만듦
							break;
						}
						
						Thread.sleep(10);
					}
					
					CTX.runOnUiThread(new Runnable() {
						run: function() {
							progressDialog.dismiss();
							progressDialog = null;
						}
					});
				} catch(e) {
					toast("파일을 체크하는 도중 오류가 발생했습니다.\n" + e, 1);
				}
			}
		});
		checkFilesThread.start();
	} catch(e) {
		toast("파일을 체크하는 도중 오류가 발생했습니다.\n" + e, 1);
	}
}

function downloadFileFromURL(url, path, fileName) {
	try {
		if(getInternetStatus() == "Offline") { //오프라인 상태
			toast("네트워크에 연결되어 있지않아 인터넷으로부터 파일을 다운로드 받아올 수 없습니다.", 1);
			return false;
		}
		
		var downloadQueueId;
		
		var request = new DownloadManager.Request(Uri.parse(url));
		request.setTitle(fileName + " 파일을 다운로드 중입니다...");
		request.setDescription("잠시만 기다려주세요.");
		request.allowScanningByMediaScanner();
		request.setDestinationInExternalPublicDir(path.replace(SD_CARD, ""), fileName); //setDestinationInExternalPublicDir에서 디렉토리 인자는 getExternalFilesDir(String);으로 넘어가기 때문에 절대경로를 제외한 폴더를 사용
		
		var downloadManager = CTX.getSystemService(CTX.DOWNLOAD_SERVICE);
		downloadQueueId = downloadManager.enqueue(request);
	} catch(e) {
		toast("파일 다운로드에 실패하였습니다!\n" + e, 1);
	}
}

function dip2px(dips) {
	return parseInt(dips * CTX.getResources().getDisplayMetrics().density + 0.5);
}

function toast(message, duration) {
	CTX.runOnUiThread(new Runnable({
		run: function() {
			if(duration == null)
				duration = 0;
			new Toast(CTX).makeText(CTX, message.toString(), duration).show();
		}
	}));
}

function readURL(url, returnType) {
	if(getInternetStatus() == "Offline") { //오프라인
		toast("인터넷 연결 상태를 확인해주세요.", 1);
		return "";
	}
	
	var URLContent = "";
	var bufferedReader = new BufferedReader(new InputStreamReader(URL(url).openStream()));
	
	var temp = "";
	while ((temp = bufferedReader.readLine()) != null) {
		URLContent += (URLContent == "" ? temp :  "\n" + temp);
	}
	bufferedReader.close();
	
	if(returnType == "array") //인자로 배열을 넘긴 경우 배열로 출력
		return URLContent.split("\n");
	else //인자로 배열을 지정하지 않은 경우 하나의 string으로 출력
		return URLContent;
}

function showWindow(window, gravity, x, y) {
	CTX.runOnUiThread(new Runnable({
		run: function() {
			try {
				window.showAtLocation(CTX.getWindow().getDecorView(), gravity, x, y);
			} catch(e) {
				toast("윈도우를 생성하는 도중 에러가 발생하였습니다.\n" + e, 1);
			}
		}
	}));
}

function closeWindow(window) {
	CTX.runOnUiThread(new Runnable({
		run: function() {
			try {
				if(window.isShowing()) {
					window.dismiss();
					//window = null;
				}
			} catch(e) {
				toast("윈도우를 종료하는 과정에서 문제가 발생했습니다.\n" + e, 1);
			}
		}
	}));
}

function alertDialog(title, content, listener, positive, neutral, negative) {
	CTX.runOnUiThread(new Runnable({
		run: function() {
			try {
				var alertDialog = new AlertDialog.Builder(CTX);
				alertDialog.setTitle(title.toString());
				alertDialog.setMessage(content.toString());
				
				if(positive != null) alertDialog.setPositiveButton(positive, listener);
				if(neutral != null) alertDialog.setNeutralButton(neutral, listener);
				if(negative != null) alertDialog.setNegativeButton(negative, listener);
				
				alertDialog.show();
			} catch(e) {
				toast("다이얼로그를 생성하는 과정에서 문제가 발생했습니다.\n" + e, 1);
			}
		}
	}));
}

function makeShortcutWindow() {
	CTX.runOnUiThread(new Runnable({
		run: function() {
			try {
				var layout = new RelativeLayout(CTX);
				
				//도끼버튼 속성
				var axeButtonParams = new RelativeLayout.LayoutParams(dip2px(30), dip2px(30));
				axeButtonParams.setMargins(0, 0, dip2px(3), dip2px(3));
				axeButtonParams.addRule(RelativeLayout.ALIGN_PARENT_TOP);
				axeButtonParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
				
				//도끼버튼
				var axeButton = new Button(CTX);
				//axeButton.setText("나무\n도끼");
				//axeButton.setTextSize(SP, 10);
				//axeButton.setPadding(0, 0, 0, 0);
				axeButton.setAlpha(0.7);
				axeButton.setBackground(Drawable.createFromPath(GUI_PATH + "axe_button_on.png"));
				axeButton.setId(AXE_BUTTON_ID);
				layout.addView(axeButton, axeButtonParams);
				
				//도끼버튼 팝업설명 속성
				var axeButtonPopupParams = new RelativeLayout.LayoutParams(-2, -2);
				axeButtonPopupParams.addRule(RelativeLayout.LEFT_OF, axeButton.getId());
				axeButtonPopupParams.addRule(RelativeLayout.ALIGN_TOP, axeButton.getId());
				
				//도끼버튼 팝업 설명
				var axeButtonPopup = new TextView(CTX);
				axeButtonPopup.setText("[나무 도끼]\n현재 들고 있는 아이템을 나무도끼로 변경합니다.\n아무런 아이템도 쥐고있지 않은 경우 효과가 없습니다.");
				axeButtonPopup.setTextSize(SP, 10);
				axeButtonPopup.setAlpha(0);
				axeButtonPopup.setBackgroundColor(Color.BLACK);
				axeButtonPopup.setClickable(false);
				axeButtonPopup.setPadding(dip2px(5), dip2px(5), dip2px(5), dip2px(5));
				layout.addView(axeButtonPopup, axeButtonPopupParams);
				
				//커맨드버튼 속성
				var cmdButtonParams = new RelativeLayout.LayoutParams(dip2px(30), dip2px(30));
				cmdButtonParams.setMargins(0, 0, dip2px(3), dip2px(3));
				cmdButtonParams.addRule(RelativeLayout.BELOW, AXE_BUTTON_ID);
				cmdButtonParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
				
				//커맨드버튼
				var cmdButton = new Button(CTX);
				//cmdButton.setText("명령어");
				//cmdButton.setTextSize(SP, 10);
				//cmdButton.setPadding(0, 0, 0, 0);f\
				cmdButton.setAlpha(0.7);
				cmdButton.setBackground(Drawable.createFromPath(GUI_PATH + "command_button_on.png"));
				cmdButton.setId(CMD_BUTTON_ID);
				layout.addView(cmdButton, cmdButtonParams);
				
				//커맨드버튼 팝업 설명 속성
				var cmdButtonPopupParams = new RelativeLayout.LayoutParams(-2, -2);
				cmdButtonPopupParams.addRule(RelativeLayout.LEFT_OF, AXE_BUTTON_ID);
				cmdButtonPopupParams.addRule(RelativeLayout.ALIGN_TOP, AXE_BUTTON_ID);
				
				//커맨드버튼 팝업 설명
				var cmdButtonPopup = new TextView(CTX);
				cmdButtonPopup.setText("[명령어 버튼]\n명령어를 GUI를 통해서 쉽게 사용할 수 있습니다.");
				cmdButtonPopup.setTextSize(SP, 10);
				cmdButtonPopup.setAlpha(0);
				cmdButtonPopup.setBackgroundColor(Color.BLACK);
				cmdButtonPopup.setClickable(false);
				cmdButtonPopup.setPadding(dip2px(5), dip2px(5), dip2px(5), dip2px(5));
				layout.addView(cmdButtonPopup, cmdButtonPopupParams);
				
				//버튼 터치 리스너
				var buttonOnTouchListener = new OnTouchListener({
					onTouch: function(view, event) {
						switch(event.action) {
							//버튼 다운
							case MotionEvent.ACTION_DOWN:
							case MotionEvent.ACTION_MOVE:
								if(view == axeButton) {
									axeButton.setBackground(Drawable.createFromPath(GUI_PATH + "axe_button_off.png"));
									axeButtonPopup.setAlpha(1);
								}
								else if(view == cmdButton) {
									cmdButton.setBackground(Drawable.createFromPath(GUI_PATH + "command_button_off.png"));
									cmdButtonPopup.setAlpha(1);
								}
								break;
							
							//버튼 업
							case MotionEvent.ACTION_UP:
								if(view == axeButton) {
									axeButton.setBackground(Drawable.createFromPath(GUI_PATH + "axe_button_on.png"));
									axeButtonPopup.setAlpha(0);
								}
								else if(view == cmdButton) {
									cmdButton.setBackground(Drawable.createFromPath(GUI_PATH + "command_button_on.png"));
									cmdButtonPopup.setAlpha(0);
								}
								break;
						}
						return false;
					}
				});
				axeButton.setOnTouchListener(buttonOnTouchListener);
				cmdButton.setOnTouchListener(buttonOnTouchListener);
				
				//버튼 온클릭 리스너
				var buttonOnClickListener = new OnClickListener({
					onClick: function(view) {
						switch(view) {
							case axeButton:
								Entity.setCarriedItem(Player.getEntity(), 271, 1, 0); //나무도끼 지급
								break;
							
							case cmdButton:
								makeCommandWindow();
								break;
						}
					}
				});
				axeButton.setOnClickListener(buttonOnClickListener);
				cmdButton.setOnClickListener(buttonOnClickListener);
				
				shortcutWindow = new PopupWindow(layout, -2, -2);
			} catch(e) {
				toast("단축 버튼 윈도우를 생성하는 과정에서 오류가 발생했습니다,\n" + e, 1);
			}
		}
	}));
}

function setPoint(x, y, z, point, block, blockData) {
	point.x = x;
	point.y = y;
	point.z = z;
	
	clientMessage(ChatColor.RED + "지점 " + ((point == firstPoint) ? "1이" : "2가") + " 설정되었습니다. x: " + x + ", y: " + y + ", z:" + z);
	
	new Thread({
		run: function() {
			try{
			Level.setTile(x, y, z, 159, 14);
			Thread.sleep(300);
			Level.setTile(x, y, z, block, blockData);}catch(e){toast(e, 1);}
		}
	}).start();
}

function makeCommandWindow() {
	CTX.runOnUiThread(new Runnable({
		run: function() {
			try {
				if(commandDialog != null) {
					commandDialog.show();
					return;
				}
				
				var content = [
					"채우기",
					"벽",
					"비우기",
					"바꾸기",
					"벽 바꾸기",
					"남기기",
					"흡수",
					"복사",
					"붙여넣기",
					"구",
					"반구",
					"빈 구",
					"빈 반구",
					"역 반구",
					"역 빈 반구",
					"원",
					"빈 원",
					"원기둥",
					"빈 원기둥",
					"길이",
					"덮기"
				];
				
				commandDialog = new AlertDialog.Builder(CTX);
				commandDialog.setTitle("명령어 목록");
				commandDialog.setItems(content,
					new android.content.DialogInterface.OnClickListener({
						onClick: function(dialog, which){
							var command = content[which].replace(/ /gi, ""); //replaceAll(" ", "");
							var unnecessaryPointCommands = ["구", "반구", "빈구", "빈반구", "역반구", "역빈반구", "원", "빈원", "빈원기둥", "붙여넣기"]; //영역을 지정해줄 필요가 없는 명령어
							
							isPointNecessary = true;
							for each(var i in unnecessaryPointCommands)
								if(command == i) isPointNecessary = false;
							
							if(isPointNecessary) { //영역 지정이 필요한 명령어
								if(firstPoint.x == null || secondPoint.x == null) return;
								
								minPoint = comparePoint(0); 
								maxPoint = comparePoint(1);
							}
							
							chooseItemOnGUI(command); //GUI 창에서 블럭이나 아이템을 선택
						}
					})
				);
				commandDialog.show();
			} catch(e) {
				toast("커맨드 윈도우를 생성하는 과정에서 오류가 발생했습니다.\n" + e, 1);
			}
		}
	}));
}

function chooseItemOnGUI(command) {
	try {
		//자바 소스 상에서 과도한 setTile을 요청할 경우 확률적으로 팅기기 때문에 (Thread와 setTile 사이에 호환성이 좋지않은 것으로 추정됨)
		//commandDetector를 통해 modTick으로 할 일을 넘긴 후
		//실질적인 setTile 작업은 commandHandler에서 수행
		switch(command) {
			case "채우기":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				toast("어떤 블럭으로 채우시겠습니까?", 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
							if(selectedItemId != null) {
								commandDetector = true;
							}
							
							GUIWindow.setOnDismissListener(null);
					}
				}));
				break;
			
			case "벽":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				toast("어떤 블럭으로 벽을 생성하시겠습니까?", 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId != null)
							commandDetector = true;
						
						GUIWindow.setOnDismissListener(null);
					}
				}));
				break;
			
			case "비우기":
				commandDetector = true;
				break;
			
			case "바꾸기":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				toast("어떤 블럭을 바꾸시겠습니까?", 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId == null)
							return;
						
						fromId = selectedItemId;
						fromData = selectedItemData;
						
						showWindow(GUIWindow, Gravity.CENTER, 0, 0);
						toast("어떤 블럭으로 바꾸시겠습니까?", 0);
						
						GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
							onDismiss: function() {
								if(selectedItemId == null) {
									fromId = null;
									fromData = null;
									return;
								}
								
								toId = selectedItemId;
								toData = selectedItemData;
								
								commandDetector = true;
								
								selectedItemId = null;
								selectedItemData = null;
								GUIWindow.setOnDismissListener(null);
							}
						}));
					}
				}));
				break;
			
			case "벽바꾸기":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				toast("어떤 블럭을 바꾸시겠습니까?", 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId == null)
							return;
						
						fromId = selectedItemId;
						fromData = selectedItemData;
						
						selectedItemId = null;
						selectedItemData = null;
						
						showWindow(GUIWindow, Gravity.CENTER, 0, 0);
						toast("어떤 블럭으로 바꾸시겠습니까?", 0);
						
						GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
							onDismiss: function() {
								if(selectedItemId == null) {
									fromId = null;
									fromData = null;
									return;
								}
								
								toId = selectedItemId;
								toData = selectedItemData;
								
								commandDetector = true;
								
								selectedItemId = null;
								selectedItemData = null;
								GUIWindow.setOnDismissListener(null);
							}
						}));
					}
				}));
				break;
			
			case "남기기":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				toast("어떤 블럭을 남기시겠습니까?", 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId == null)
							return;
						
						fromId = selectedItemId;
						fromData = selectedItemData;
						
						showWindow(GUIWindow, Gravity.CENTER, 0, 0);
						toast("어떤 블럭으로 바꾸시겠습니까?", 0);
						
						GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
							onDismiss: function() {
								if(selectedItemId == null) {
									fromId = null;
									fromData = null;
									return;
								}
								
								toId = selectedItemId;
								toData = selectedItemData;
								
								commandDetector = true;
								
								selectedItemId = null;
								selectedItemData = null;
								GUIWindow.setOnDismissListener(null);
							}
						}));
					}
				}));
				break;
			
			case "흡수":
				commandDetector = true;
				break;
			
			case "복사":
				commandDetector = true;
				break;
			
			case "붙여넣기":
				commandDetector = true;
				break;
			
			case "구":
			case "빈구":
			case "반구":
			case "빈반구":
			case "역반구":
			case "역빈반구":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				radiusSetting();
				toast("어떤 블럭으로 조형물을 생성하시겠습니까?", 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId == null)
							return;
						
						commandDetector = true;
						
						GUIWindow.setOnDismissListener(null);
					}
				}));
				break;
			
			case "원":
			case "빈원":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				radiusSetting();
				toast("어떤 블럭으로 조형물을 생성하시겠습니까?", 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId == null)
							return;
						
						commandDetector = true;
						
						GUIWindow.setOnDismissListener(null);
					}
				}));
				break;
			
			case "원기둥":
			case "빈원기둥":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				cylinderSetting();
				toast("어떤 블럭으로 조형물을 생성하시겠습니까?", 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId == null)
							return;
						
						selectedItemId;
						selectedItemData;
						
						commandDetector = true;
						
						GUIWindow.setOnDismissListener(null);
					}
				}));
				break;
			
			case "덮기":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				toast("어떤 블럭으로 덮으시겠습니까?", 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId == null)
							return;
						
						commandDetector = true;
						
						GUIWindow.setOnDismissListener(null);
					}
				}));
				break;
		}
		
		selectedCommand = command;
	} catch(e) {
		toast("아이템/블럭 선택창을 띄우는 과정에서 오류가 발생했습니다.\n" + e);
	}
}

function commandHandler(command) {
	try {
		switch(command) {
			case "채우기":
				fill(minPoint, maxPoint, selectedItemId, selectedItemData);
				selectedItemId = null;
				selectedItemData = null;
				break;
			
			case "벽":
				wall(minPoint, maxPoint, selectedItemId, selectedItemData);
				selectedItemId = null;
				selectedItemData = null;
				break;
			
			case "비우기":
				fill(minPoint, maxPoint, 0, 0);
				break;
			
			case "바꾸기":
				replace(minPoint, maxPoint, fromId, fromData, toId, toData);
				fromId = null;
				fromData = null;
				toId = null;
				toData = null;
				break;
			
			case "벽바꾸기":
				wallReplace(minPoint, maxPoint, fromId, fromData, toId, toData);
				fromId = null;
				fromData = null;
				toId = null;
				toData = null;
				break;
			
			case "남기기":
				preserve(minPoint, maxPoint, fromId, fromData, toId, toData);
				fromId = null;
				fromData = null;
				toId = null;
				toData = null;
				break;
			
			case "흡수":
				drain(minPoint, maxPoint);
				break;
			
			case "복사":
				copy(minPoint, maxPoint);
				break;
			
			case "붙여넣기":
				paste();
				break;
			
			case "구":
			case "빈구":
			case "반구":
			case "빈반구":
			case "역반구":
			case "역빈반구":
				createSphere(command, Math.floor(Player.getX()), Math.floor(Player.getY() - 1), Math.floor(Player.getZ()), selectedItemId, selectedItemData, radius);
				selectedItemId = null;
				selectedItemData = null;
				radius = 0;
				break;
			
			case "원":
			case "빈원":
				createCircle(command, Math.floor(Player.getX()), Math.floor(Player.getY() - 1), Math.floor(Player.getZ()), selectedItemId, selectedItemData, radius);
				selectedItemId = null;
				selectedItemData = null;
				radius = 0;
				break;
			
			case "원기둥":
			case "빈원기둥":
				createCylinder(command, Math.floor(Player.getX()), Math.floor(Player.getY() - 1), Math.floor(Player.getZ()), selectedItemId, selectedItemData, radius, height);
				selectedItemId = null;
				selectedItemData = null;
				radius = 0;
				height = 0;
				break;
			
			case "덮기":
				cover(minPoint, maxPoint, selectedItemId, selectedItemData);
				selectedItemId = null;
				selectedItemData = null;
				break;
		}
	} catch(e) {
		toast("커맨드 핸들러 함수에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function makeGUIWindow() {
	makeGUIWindowThread = new Thread(new Runnable() {
		run: function() {
			try {
				var progressDialog;
				CTX.runOnUiThread(new Runnable() {
					run: function() {
						progressDialog = ProgressDialog.show(CTX, "GUI를 불러오고 있습니다...", "잠시만 기다려주세요...", true, false);
					}
				});
				
				var rLayout = new RelativeLayout(CTX);
				rLayout.setGravity(Gravity.CENTER);
				rLayout.setBackgroundColor(Color.argb(128, 0, 0, 0));
				
				var tableParams = new RelativeLayout.LayoutParams(dip2px(630), dip2px(350));
				tableParams.setMargins(dip2px(5), dip2px(5), 0, 0);
				
				var table = new ImageView(CTX);
				var source = new BitmapFactory.decodeFile(GUI_PATH + "table.png");
				table.setImageBitmap(new Bitmap.createScaledBitmap(source, dip2px(630), dip2px(350), true));
				table.setId(TABLE_ID);
				rLayout.addView(table, tableParams);
				
				var vLayout = new Array();
				
				//아이템, 블럭 버튼 생성
				var files = getAllFiles(ITEM_PATH);
				var currentPage = 0;
				vLayout = makeItemButtons(files, rLayout, vLayout, currentPage, progressDialog);
				
				var ButtonOnTouchListener = new  OnTouchListener({
					onTouch: function(view, event) {
						var source;
						
						switch(event.action) {
							case MotionEvent.ACTION_DOWN:
							case MotionEvent.ACTION_MOVE:
								if(view == prevButton)
									source = new BitmapFactory.decodeFile(GUI_PATH + "prev_button_off.png");
								else if(view == nextButton)
									source = new BitmapFactory.decodeFile(GUI_PATH + "next_button_off.png");
								break;
							
							case MotionEvent.ACTION_UP:
								if(view == prevButton)
									source = new BitmapFactory.decodeFile(GUI_PATH + "prev_button_on.png");
								else if(view == nextButton)
									source = new BitmapFactory.decodeFile(GUI_PATH + "next_button_on.png");
								break;
						}
						
						view.setBackground(new BitmapDrawable(source));
						
						return false;
					}
				});
				
				var ButtonOnClickListener = new OnClickListener({
					onClick: function(view) {
						switch(view) {
							case prevButton:
								if(currentPage == 0) return;
								
								vLayout[currentPage].setAlpha(0);
								vLayout[--currentPage].setAlpha(1);
								vLayout[currentPage].bringToFront();
								break;
							
							case nextButton:
								if(currentPage == Math.floor(files.length / 66)) return;
								
								vLayout[currentPage].setAlpha(0);
								vLayout[++currentPage].setAlpha(1);
								vLayout[currentPage].bringToFront();
								break;
							
							case closeButton:
								selectedItemId = null;
								selectedItemData = null;
								GUIWindow.dismiss();
								break;
						}
						
						pageText.setText((currentPage + 1) + "/" + (lastPage + 1));
					}
				});
				
				var lastPage = Math.floor(files.length / 66);
				
				var pageTextParams = new RelativeLayout.LayoutParams(-2, -2);
				pageTextParams.addRule(RelativeLayout.ALIGN_BOTTOM, TABLE_ID);
				pageTextParams.addRule(RelativeLayout.ALIGN_RIGHT, TABLE_ID);
				pageTextParams.setMargins(0, 0, dip2px(60), dip2px(5));
				
				var pageText = new TextView(CTX);
				pageText.setText((currentPage + 1) + "/" + (lastPage + 1));
				pageText.setTextSize(SP, 20);
				rLayout.addView(pageText, pageTextParams);
				
				//arrow buttons
				var arrowLayoutParams = new RelativeLayout.LayoutParams(-2, -2);
				arrowLayoutParams.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
				arrowLayoutParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
				arrowLayoutParams.setMargins(0, 0, dip2px(3), dip2px(20));
				
				var arrowLayout = new LinearLayout(CTX);
				arrowLayout.setOrientation(1);
				
				var arrowButtonParams = new LinearLayout.LayoutParams(dip2px(40), dip2px(40));
				arrowButtonParams.setMargins(0, dip2px(10), 0, 0);
				
				var prevButton = new Button(CTX);
				prevButton.setOnTouchListener(ButtonOnTouchListener);
				prevButton.setOnClickListener(ButtonOnClickListener);
				var prevButtonSource = new BitmapFactory.decodeFile(GUI_PATH + "prev_button_on.png");
				prevButton.setBackground(new BitmapDrawable(prevButtonSource));
				arrowLayout.addView(prevButton, arrowButtonParams);
				
				var nextButton = new Button(CTX);
				nextButton.setOnTouchListener(ButtonOnTouchListener);
				nextButton.setOnClickListener(ButtonOnClickListener);
				var nextButtonSource = new BitmapFactory.decodeFile(GUI_PATH + "next_button_on.png");
				nextButton.setBackground(new BitmapDrawable(nextButtonSource));
				arrowLayout.addView(nextButton, arrowButtonParams);
				
				rLayout.addView(arrowLayout, arrowLayoutParams);
				
				//close button
				var closeLayout = RelativeLayout(CTX);
				
				var closeLayoutParams = new RelativeLayout.LayoutParams(-2, -2);
				closeLayoutParams.addRule(RelativeLayout.ALIGN_PARENT_TOP);
				closeLayoutParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
				
				var closeButtonParams = new RelativeLayout.LayoutParams(dip2px(50), dip2px(50));
				
				var closeButton = new Button(CTX);
				closeButton.setAlpha(0);
				closeButton.setOnClickListener(ButtonOnClickListener);
				closeLayout.addView(closeButton, closeButtonParams);
				
				rLayout.addView(closeLayout, closeLayoutParams);
				
				GUIWindow = new PopupWindow(rLayout, -1, -1);
				GUIWindow.setFocusable(true);
				//GUIWindow.showAtLocation(CTX.getWindow().getDecorView(), Gravity.CENTER, 0, 0);
				
				CTX.runOnUiThread(new Runnable() {
					run: function() {
						progressDialog.dismiss();
						progressDialog = null;
					}
				});
				
				toast("월드에딧을 사용할 준비가 완료되었습니다.", 0);
			} catch(e) {
				toast("월드에딧 GUI를 불러오는 데 실패하였습니다.\n" + e, 1);
			}
		}
	});
	makeGUIWindowThread.start();
}

function getAllFiles(path) {
	try {
		var files = new Array();
		var list = new File(path).list();
		
		files.push("");
		
		for each(var i in list) {
			if(i == ".nomedia" || i == "no_image.png") continue;
			files.push(i + "");
		}
		
		for(var i = 0; i < 512; i++) {
			if(Item.getName(i, 0, true) == null) continue;
			
			if(files.indexOf(i + "-0.png") == -1 && Item.getName(i, 0, true).indexOf("Missing") == -1) {
				var j = 0;
				
				while(Item.getName(i, j, true).indexOf("Missing") == -1) {
					files.push(i + "-" + j + ".png");
					
					j++;
					if(j != 0 && Item.getName(i, j, true) == Item.getName(i, 0, true)) break; //모든 데이터 얻은 후 반복문 탈출
				}
			}
		}
		
		files.sort(function(a, b) {
			if(a.split("-")[0] != b.split("-")[0])
				return (parseInt(a.split("-")[0]) - parseInt(b.split("-")[0]));
			else
				return (parseInt(a.split("-")[1].split(".png")[0]) - parseInt(b.split("-")[1].split(".png")[0]));
		});
		
		return files;
	} catch(e) {
		toast(e, 1);
	}
}

function makeItemButtons(files, rLayout, vLayout, currentPage, progressDialog) {
	try {
		var test;
		var vLayoutParams = new RelativeLayout.LayoutParams(-2, -2);
		vLayoutParams.setMargins(dip2px(10), dip2px(15), 0, 0);
		
		var buttonParams = new LinearLayout.LayoutParams(dip2px(50), dip2px(50));
		
		var itemButtonOnClickListener = new OnClickListener({
			onClick: function(view) {
				var fileName = files[parseInt(view.getId())];
				
				toast(fileName.replace("-", ":").replace(".png", ""), 0);
				selectedItemId = parseInt(fileName.split("-")[0]);
				selectedItemData = parseInt(fileName.split("-")[1].split(".png")[0]);
				
				if(!canItemSelect && selectedItemId > 255) {
					toast("아이템은 선택할 수 없습니다.", 0);
					 
					selectedItemId = null;
					selectedItemData = null;
					return;
				}
				
				CTX.runOnUiThread(new Runnable() {
					run: function() {
						GUIWindow.dismiss();
					}
				});
				
			}
		});

		var itemButtonOnLongClickListener = new OnLongClickListener({
			onLongClick: function(view) {
				var fileName = files[parseInt(view.getId())];
				var itemId = parseInt(fileName.split("-")[0]);
				var itemData = parseInt(fileName.split("-")[1].split(".png")[0]);
				
				if(itemId == 255) return; //255 팅김 방지
				toast(fileName.replace("-", ":").replace(".png", "") + " " + Item.getName(itemId, itemData, true).replace("tile.", "").replace("item.", ""), 0);
				
				return true;
			}
		});
		
		for(var i = 0; i <= Math.floor(files.length / 66); i++) {
			//currentPage = i;
			
			vLayout.push(new LinearLayout(CTX)); // == vLayout[i] = new LinearLayout(CTX);
			vLayout[i].setOrientation(1);
			vLayout[i].setPadding(dip2px(10), dip2px(10), dip2px(10), 0);
			//vLayout[i].setBackgroundColor(Color.argb(255, 255, 0, 0));
			
			for(var j = 0; j <= 5; j++) {  
				var hLayout = new LinearLayout(CTX);
				hLayout.setOrientation(0);
				
				for(var k = 0; k <= 10; k++) {
					var itemLayout = new RelativeLayout(CTX);
					
					var id = (i * 66) + (j * 11) + k + 1;
					var src = new BitmapFactory.decodeFile(ITEM_PATH + files[id]);
					
					var itemImage = new ImageView(CTX);
					itemImage.setId(id);
					itemImage.setPadding(0, 0, 0, 0);
					if(files[id] != null) {
						if(File(ITEM_PATH + files[id]).exists()) {
							itemImage.setImageBitmap(new Bitmap.createScaledBitmap(src, dip2px(50), dip2px(50), true));
							test = files[id];
						} else
							itemImage.setImageBitmap(new Bitmap.createScaledBitmap(new BitmapFactory.decodeFile(ITEM_PATH + "no_image.png"), dip2px(50), dip2px(50), true));
						
						itemImage.setOnLongClickListener(itemButtonOnLongClickListener);
						itemImage.setOnClickListener(itemButtonOnClickListener);
					} else {
						itemImage.setOnClickListener(null);
					}
					itemLayout.addView(itemImage, buttonParams);
					
					var itemTextLayoutParams = new RelativeLayout.LayoutParams(-2, -2);
					itemTextLayoutParams.addRule(RelativeLayout.ALIGN_RIGHT, id);
					itemTextLayoutParams.addRule(RelativeLayout.ALIGN_BOTTOM, id);
					
					var itemText = new TextView(CTX);
					itemText.setText((files[id] != null) ? files[id].replace("-", ":").replace(".png", "") : "");
					itemText.setTextSize(SP, 10);
					itemText.setClickable(false);
					itemLayout.addView(itemText, itemTextLayoutParams);
					
					hLayout.addView(itemLayout);
					
					CTX.runOnUiThread(new Runnable() {
						run: function() {
							try {
								progressDialog.setMessage(((id / ((Math.floor(files.length / 66) * 66) + (5 * 11) + 10 + 1) * 100)).toFixed(2).toString() + "%");
							} catch(e) { toast(e, 1); }
						}
					});
				}
				
				vLayout[i].addView(hLayout);
				if(i != 0)
					vLayout[i].setAlpha(0);
			}
			
			rLayout.addView(vLayout[i], vLayoutParams);
		}
		vLayout[0].bringToFront();
		
		return vLayout;
	} catch(e) {
		toast("아이템 버튼 생성 도중 오류가 발생했습니다. \n" + test, 1);
	}
}

function radiusSetting() {
	CTX.runOnUiThread(new Runnable({
		run: function() {
			try {
				radius = "";
				
				var editText = new EditText(CTX);
				editText.setHint("반지름을 입력하세요.");
				editText.setInputType(InputType.TYPE_CLASS_NUMBER);
				
				var listener = new DialogInterface.OnClickListener({
					onClick: function(dialog, which) {
						switch(which) {
							case DialogInterface.BUTTON_POSITIVE:
								if(editText.getText() + "" == "") {
									toast("반지름이 설정되지않았습니다.", 0);
									closeWindow(GUIWindow);
								}
								radius = parseInt(editText.getText());
								break;
							
							case DialogInterface.BUTTON_NEGATIVE:
								closeWindow(GUIWindow);
								break;
						}
					}
				});
				
				var dialog = new AlertDialog.Builder(CTX);
				dialog.setTitle("반지름을 설정하세요.");
				dialog.setView(editText);
				dialog.setPositiveButton("설정", listener);
				dialog.setNegativeButton("닫기", listener);
				dialog.setCancelable(false);
				dialog.show();
			} catch(e) {
				toast("반지름 설정 다이얼로그를 생성하는 과정에서 문제가 발생했습니다.\n" + e, 1);
			}
		}
	}));
}

function cylinderSetting() {
	CTX.runOnUiThread(new Runnable({
		run: function() {
			try {
				radius = "";
				height = "";
				
				var layout = new LinearLayout(CTX);
				layout.setOrientatoin(1);
				
				var radiusEdit = new EditText(CTX);
				radiusEdit.setHint("반지름을 입력하세요.");
				radiusEdit.setInputType(InputType.TYPE_CLASS_NUMBER);
				layout.addView(radiusEdit);
				
				var heightEdit = new EditText(CTX);
				heightEdit.setHint("높이를 입력하세요.");
				heightEdit.setInputType(InputType.TYPE_CLASS_NUMBER);
				layout.addView(heightEdit);
				
				var listener = new DialogInterface.OnClickListener({
					onClick: function(dialog, which) {
						switch(which) {
							case DialogInterface.BUTTON_POSITIVE:
								if(radiusEdit.getText() + "" == "" || heightEdit.getText() + "" == "") {
									toast("반지름 또는 높이가 제대로 설정되지않았습니다.", 0);
									closeWindow(GUIWindow);
								}
								
								radius = parseInt(radiusEdit.getText());
								height = parseInt(heightEdit.getText());
								break;
							
							case DialogInterface.BUTTON_NEGATIVE:
								closeWindow(GUIWindow);
								break;
						}
					}
				});
				
				var dialog = new AlertDialog.Builder(CTX);
				dialog.setTitle("반지름과 높이를 설정하세요.");
				dialog.setView(layout);
				dialog.setPositiveButton("설정", listener);
				dialog.setNegativeButton("닫기", listener);
				dialog.setCancelable(false);
				dialog.show();
			} catch(e) {
				toast("원기둥 설정 다이얼로그를 생성하는 과정에서 문제가 발생했습니다.\n" + e, 1);
			}
		}
	}));
}

function showWeb(url) {
	
}

function preventFolding() {
	var entity = Player.getEntity();
	var x = Player.getX();
	var y = Player.getY();
	var z = Player.getZ();
	
	while(Level.getTile(x, y - 1, z) != 0 || Level.getTile(x, y, z) != 0)
		Entity.setPosition(entity, x, ++y, z);
}

function josa(kor, josa) {
	var finalCode = kor.charCodeAt(kor.length - 1) - FIRST_KOREAN_OF_UNICODE; //kor의 마지막 문자의 유니코드 번호
	
	if(josa == "이" || josa == "가")
		josa = (((finalCode - 44032) % (MEDIAL * FINAL)) % FINAL == 0 ? "가" : "이");
	else if(josa == "은" || josa == "는")
		josa = (((finalCode - 44032) % (MEDIAL * FINAL)) % FINAL == 0 ? "는" : "은");
	else if(josa == "을" || josa == "를")
		josa = (((finalCode - 44032) % (MEDIAL * FINAL)) % FINAL == 0 ? "를" : "을");
	else if(josa == "와" || josa == "과")
		josa = (((finalCode - 44032) % (MEDIAL * FINAL)) % FINAL == 0 ? "와" : "과");
	
	return (kor + josa);
}

function getInternetStatus() {
	var manager = CTX.getSystemService(CTX.CONNECTIVITY_SERVICE);
	
	var isData = manager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE).isConnectedOrConnecting();
	var isWiFi = manager.getNetworkInfo(ConnectivityManager.TYPE_WIFI).isConnectedOrConnecting();
	var isOffline = (!isData && !isWiFi);
	
	if(isData) //데이터
		return "Data";
	else if(isWiFi) //와이파이
		return "WiFi";
	else if(isOffline) //오프라인
		return "Offline";
}

function internet(url) {
	try {
	var uri = Uri.parse(url);
	var it  = new Intent(Intent.ACTION_VIEW, uri);
	CTX.startActivity(it);
	} catch(e) {
		toast("인터넷 창을 띄우는 데에 오류가 발생했습니다.\n" + e, 1);
	}
}

function saveOption(option, value) {
	try {
		var fileInputStream = new FileInputStream(File(OPTION_FILE));
		var inputStreamReader = new InputStreamReader(fileInputStream);
		var bufferedReader = new BufferedReader(inputStreamReader);
		
		var fileContent = "";
		while(true) {
			var temp = bufferedReader.readLine();
			
			if(temp == null) //파일 끝
				break;
			
			temp += ""; //자바 -> 자바스크립트 문자열 형변환
			if(temp.split("=")[0] == option) //이미 밸류가 저장된 경우 무시
				continue;
			
			fileContent += temp + "\n";
		}
		
		fileInputStream.close();
		inputStreamReader.close();
		bufferedReader.close();
		
		var fileOutputStream = new FileOutputStream(File(OPTION_FILE));
		var outputStreamWriter = new OutputStreamWriter(fileOutputStream);
		
		outputStreamWriter.write(fileContent + option.toString() + "=" + value.toString()); //새로운 데이터 덧붙여 저장
		
		outputStreamWriter.close();
		fileOutputStream.close();
	} catch(e) {
		toast("파일을 저장하는 과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function loadOption(option) {
	try {
		var fileInputStream = new FileInputStream(File(OPTION_FILE));
		var inputStreamReader = new InputStreamReader(fileInputStream);
		var bufferedReader = new BufferedReader(inputStreamReader);
		
		var value = "";
		while(true) {
			var temp = bufferedReader.readLine();
			
			if(temp == null) //파일의 끝
				break;
			
			temp += ""; //자바 -> 자바스크립트 문자열 형변환
			
			if(temp.split("=")[0] == option) {
				value = temp.split("=")[1];
				break;
			}
		}
		
		fileInputStream.close();
		inputStreamReader.close();
		bufferedReader.close();
		
		return value;
	} catch(e) {
		toast("파일을 불러오는 과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function notice() {
	try { 
		if(getInternetStatus() != "Offline") {
			var noticeSerialNumber = readURL(NOTICE_FILE_URL).split("\n", 2)[0];
			var noticeContent = readURL(NOTICE_FILE_URL).split("\n", 2)[1];
			if(noticeContent != "" && (noticeSerialNumber != loadOption("notice_serial_number"))) {
				var listener = new DialogInterface.OnClickListener({
					onClick: function(dialog, which) {
						switch(which) {
							case DialogInterface.BUTTON_POSITIVE:
								break;
							
							case DialogInterface.BUTTON_NEGATIVE:
								saveOption("notice_serial_number", noticeSerialNumber);
								break;
						}
					}
				});
				
				alertDialog("공지사항", noticeContent, listener, "확인", null, "다시 보지않음");
			}
		}
	} catch(e) {
		//toast("공지사항을 불러오는데 오류가 발생했습니다.\n" + e, 1);
	}
}

/* ---------------------------------------------------------------------------- Worldedit Functions ---------------------------------------------------------------------------- */

function comparePoint(type) {
	try {
		var point = {x: null, y: null, z: null};
		
		if(type == 0) { //min
			var x = Math.min(firstPoint.x, secondPoint.x);
			var y = Math.min(firstPoint.y, secondPoint.y);
			var z = Math.min(firstPoint.z, secondPoint.z);
			
			point.x = x;
			point.y = y;
			point.z = z;
			
			return point;
		} else if(type == 1) { //max
			var x = Math.max(firstPoint.x, secondPoint.x);
			var y = Math.max(firstPoint.y, secondPoint.y);
			var z = Math.max(firstPoint.z, secondPoint.z);
			
			point.x = x;
			point.y = y;
			point.z = z;
			
			return point;
		}
	} catch(e) {
		toast("두 지점을 비교하는 과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function fill(minPoint, maxPoint, id, data) {
	try {
		var blockCount = 0;
		
		//프로그래스 다이얼로그 시작
		var progressDialog;
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog = ProgressDialog.show(CTX, "채우기 작업 중입니다...", "잠시만 기다려주세요...", true, false);
			}
		});
		
		for(var x = minPoint.x; x <= maxPoint.x; x++) {
			for(var y = minPoint.y; y <= maxPoint.y; y++) {
				for(var z = minPoint.z; z <= maxPoint.z; z++) {
					Level.setTile(x, y, z, id, data);
					blockCount++;
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 바뀌었습니다.");
		
		preventFolding(); //끼임 방지
		
		var chunk_x = parseInt(maxPoint.x - minPoint.x), chunk_z = parseInt(maxPoint.z - minPoint.z);
		if(chunk_x >= 4 || chunk_z >= 4)
			clientMessage(ChatColor.RED + "[경고!] 넓은 영역을 에딧하여 청크 오류로 맵 저장이 되지 않을 수도 있습니다.");
		
		//프로그래스 다이얼로그 종료
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog.dismiss();
				progressDialog = null;
			}
		});
	} catch(e) {
		toast("fill 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function wall(minPoint, maxPoint, id, data) {
	try {
		var blockCount = 0;
		
		//프로그래스 다이얼로그 시작 
		var progressDialog;
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog = ProgressDialog.show(CTX, "벽을 생성 중입니다...", "잠시만 기다려주세요...", true, false);
			}
		});
		
		for(var y = minPoint.y; y <= maxPoint.y; y++) {
			for(var z = minPoint.z; ; z = maxPoint.z) {
				for(var x = minPoint.x; x <= maxPoint.x; x++) {
					Level.setTile(x, y, z, id, data);
					blockCount++;
				}
				
				if(z == maxPoint.z)
					break;
			}
			
			for(var x = minPoint.x; ; x = maxPoint.x) {
				for(var z = minPoint.z; z <= maxPoint.z; z++) {
					Level.setTile(x, y, z, id, data);
					blockCount++;
				}
				
				if(x == maxPoint.x)
					break;
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 바뀌었습니다.");
		
		preventFolding(); //끼임 방지
		
		//프로그래스 다이얼로그 종료
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog.dismiss();
				progressDialog = null;
			}
		});
		
	} catch(e) {
		toast("wall 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function replace(minPoint, maxPoint, fromId, fromData, toId, toData) {
	try {
		//프로그래스 다이얼로그 시작
		var progressDialog;
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog = ProgressDialog.show(CTX, "블럭을 바꾸는 중입니다...", "잠시만 기다려주세요...", true, false);
			}
		});
		
		var blockCount = 0;
		for(var x = minPoint.x; x <= maxPoint.x; x++) {
			for(var y = minPoint.y; y <= maxPoint.y; y++) {
				for(var z = minPoint.z; z <= maxPoint.z; z++) {
					if(Level.getTile(x, y, z) == fromId && Level.getData(x, y, z) == fromData) {
						Level.setTile(x, y, z, toId, toData);
						blockCount++;
					}
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 바뀌었습니다.");
		
		preventFolding();
		
		//프로그래스 다이얼로그 종료
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog.dismiss();
				progressDialog = null;
			}
		});
	} catch(e) {
		toast("replace 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function wallReplace(minPoint, maxPoint, fromId, fromData, toId, toData) {
	try {
		//프로그래스 다이얼로그 시작
		var progressDialog;
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog = ProgressDialog.show(CTX, "벽 바꾸기를 실행 중입니다...", "잠시만 기다려주세요...", true, false);
			}
		});
		
		var blockCount = 0;
		for(var y = minPoint.y; y <= maxPoint.y; y++) {
			for(var z = minPoint.z; ; z = maxPoint.z) {
				for(var x = minPoint.x; x <= maxPoint.x; x++) {
					if(Level.getTile(x, y, z) == fromId && Level.getData(x, y, z) == fromData) {
						Level.setTile(x, y, z, toId, toData);
						blockCount++;
					}
				}
				
				if(z == maxPoint.z)
					break;
			}
			
			for(var x = minPoint.x; ; x = maxPoint.x) {
				for(var z = minPoint.z; z <= maxPoint.z; z++) {
					if(Level.getTile(x, y, z) == fromId && Level.getData(x, y, z) == fromData) {
						Level.setTile(x, y, z, toId, toData);
						blockCount++;
					}
				}
				
				if(x == maxPoint.x)
					break;
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 바뀌었습니다.");
		
		preventFolding();
		
		//프로그래스 다이얼로그 종료
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog.dismiss();
				progressDialog = null;
			}
		});
	} catch(e) {
		toast("wallReplace 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function preserve(minPoint, maxPoint, preservedId, preservedData, toId, toData) {
	try {
		//프로그래스 다이얼로그 시작
		var progressDialog;
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog = ProgressDialog.show(CTX, "남기기 작업을 실행 중입니다...", "잠시만 기다려주세요...", true, false);
			}
		});
		
		var blockCount = 0;
		for(var x = minPoint.x; x <= maxPoint.x; x++) {
			for(var y = minPoint.y; y <= maxPoint.y; y++) {
				for(var z = minPoint.z; z <= maxPoint.z; z++) {
					if(Level.getTile(x, y, z) != preservedId || Level.getData(x, y, z) != preservedData) {
						Level.setTile(x, y, z, toId, toData);
						blockCount++;
					}
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 바뀌었습니다.");
		
		preventFolding();
		
		//프로그래스 다이얼로그 종료
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog.dismiss();
				progressDialog = null;
			}
		});
	} catch(e) {
		toast("preserve 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function drain(minPoint, maxPoint) {
	try {
		//프로그래스 다이얼로그 시작
		var progressDialog;
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog = ProgressDialog.show(CTX, "액체 블럭을 흡수 중입니다...", "잠시만 기다려주세요...", true, false);
			}
		});
		
		var blockCount = 0;
		for(var x = minPoint.x; x <= maxPoint.x; x++) {
			for(var y = minPoint.y; y <= maxPoint.y; y++) {
				for(var z = minPoint.z; z <= maxPoint.z; z++) {
					var block = Level.getTile(x, y, z);
					if(block == 8 || block == 9 || block == 10 || block == 11) {
						Level.setTile(x, y, z, 0);
						blockCount++;
					}
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 바뀌었습니다.");
		
		//프로그래스 다이얼로그 종료
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog.dismiss();
				progressDialog = null;
			}
		});
	} catch(e) {
		toast("drain 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function copy(minPoint, maxPoint) {
	try {
		//프로그래스 다이얼로그 시작
		var progressDialog;
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog = ProgressDialog.show(CTX, "지정된 역역을 복사 중입니다...", "잠시만 기다려주세요...", true, false);
			}
		});
		
		var length = {x: (maxPoint.x - minPoint.x + 1), y: (maxPoint.y - minPoint.y + 1), z: (maxPoint.z - minPoint.z + 1)};
		
		var blockCount = 0;
		
		clipboard = new Array(length.x);
		for(var i = 0; i < length.x; i++){
			clipboard[i] = new Array(length.y);
			
			for(var j = 0; j < length.y; j++){
				clipboard[i][j] = new Array(length.z);
				
				for(var k = 0; k < length.z; k++){
					clipboard[i][j][k] = {id: Level.getTile(minPoint.x + i, minPoint.y + j, minPoint.z + k), data: Level.getData(minPoint.x + i, minPoint.y + j, minPoint.z + k)};
					blockCount++;
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 복사되었습니다.");
		
		//프로그래스 다이얼로그 종료
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog.dismiss();
				progressDialog = null;
			}
		});
	} catch(e) {
		toast("copy 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function paste() {
	try {
		if(clipboard == null) {
			toast("클립보드에 저장된 블럭이 없습니다.", 0);
			return;
		}
		
		//프로그래스 다이얼로그 시작
		var progressDialog;
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog = ProgressDialog.show(CTX, "저장된 블럭을 붙여넣는 중입니다...", "잠시만 기다려주세요...", true, false);
			}
		});
		
		var x = Math.floor(Player.getX());
		var y = Math.floor(Player.getY() - 1);
		var z = Math.floor(Player.getZ());
		
		var yaw = Entity.getYaw(Player.getEntity());
		var sin = Math.round(Math.sin(yaw * (Math.PI / 180)));
		var cos = Math.round(Math.cos(yaw * (Math.PI / 180)));
		
		if(sin == 1)
			x = x - clipboard.length + 1;
		if(cos == -1)
			z = z - clipboard[0][0].length + 1;
		
		var firstPoint = {x: x, y: y, z: z};
		var secondPoint = {x: (x + clipboard.length - 1), y: (y + clipboard[0].length - 1), z: (z + clipboard[0][0].length - 1)};
		
		var blockCount = 0;
		for (var i = 0; i < clipboard.length; i++) {
			for (var j = 0; j < clipboard[0].length; j++) {
				for (var k = 0; k < clipboard[0][0].length; k++) {
					Level.setTile(x + i, y + j, z + k, clipboard[i][j][k].id, clipboard[i][j][k].data);
					blockCount++;
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 붙여넣어졌습니다.");
		
		preventFolding();
		
		//프로그래스 다이얼로그 종료
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog.dismiss();
				progressDialog = null;
			}
		});
	} catch(e) {
		toast("paste 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function createSphere(type, x, y, z, id, data, radius) {
	try {
		//프로그래스 다이얼로그 시작
		var progressDialog;
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog = ProgressDialog.show(CTX, josa(type, "을") + " 생성중입니다...", "잠시만 기다려주세요...", true, false);
			}
		});
		
		var blockCount  = 0;
		for(var i = -radius + 1; i < radius; i++) {
			for(var j = -radius + 1; j < radius; j++) {
				for(var k = -radius + 1; k < radius; k++) {
					switch(type) {
						case "구":
						if((i * i) + (j * j) + (k * k) <= (radius * radius)) {
							Level.setTile(x + i, y + j, z + k, id, data);
							blockCount++;
						}
						break;
						
						case "반구":
							if((i * i) + (j * j) + (k * k) <= (radius * radius) && j >= 0) {
								Level.setTile(x + i, y + j, z + k, id, data);
								blockCount++;
							}
							break;
						
						case "빈구":
							if((i * i) + (j * j) + (k * k) <= (radius * radius) && (i * i) + (j * j) + (k * k) >= (radius - 1) * (radius - 1)) {
								Level.setTile(x + i, y + j, z + k, id, data);
								blockCount++;
							}
							break;
						
						case "빈반구":
							if((i * i) + (j * j) + (k * k) <= (radius * radius) && (i * i) + (j * j) + (k * k) >= (radius - 1) * (radius - 1) && j >= 0) {
								Level.setTile(x + i, y + j, z + k, id, data);
								blockCount++;
							}
							break;
						
						case "역반구":
							if((i * i) + (j * j) + (k * k) <= (radius * radius) && j <= 0) {
								Level.setTile(x + i, y + j, z + k, id, data);
								blockCount++;
							}
							break;
						
						case "역빈반구":
							if((i * i) + (j * j) + (k * k) <= (radius * radius) && (i * i) + (j * j) + (k * k) >= (radius - 1) * (radius - 1) && j <= 0) {
								Level.setTile(x + i, y + j, z + k, id, data);
								blockCount++;
							}
							break;
					}
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + josa(type, "이") + " 생성되었습니다. 총 " + blockCount + "개의 블럭이 변경되었습니다.");
		
		preventFolding();
		
		//프로그래스 다이얼로그 종료
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog.dismiss();
				progressDialog = null;
			}
		});
	} catch(e) {
		toast("createSphere 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function createCircle(type, x, y, z, id, data, radius) {
	try {
		//프로그래스 다이얼로그 시작
		var progressDialog;
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog = ProgressDialog.show(CTX, josa(type, "을") + " 생성중입니다...", "잠시만 기다려주세요...", true, false);
			}
		});
		
		//var firstPoint = [x - radius, y, z - radius];
		//var secondPoint = [x + radius, y, z + radius];
		
		var blockCount  = 0;
		for(var i = -radius + 1; i < radius; i++) for(var j = -radius + 1; j < radius; j++){
			switch(type) {
					case "원":
					if((i * i) + (j * j) <= (radius * radius)) {
						Level.setTile(x + i, y, z + j, id, data);
						blockCount++;
					}
					break;
				case "빈원":
					if((i * i) + (j * j) <= (radius * radius) && (i * i) + (j * j) >= ((radius - 1) * (radius - 1))) {
						Level.setTile(x + i, y, z + j, id, data);
						blockCount++;
					}
					break;
			}
		}
		
		clientMessage(ChatColor.GREEN + josa(type, "이") + " 생성되었습니다. 총 " + blockCount + "개의 블럭이 변경되었습니다.");
		
		preventFolding();
		
		//프로그래스 다이얼로그 종료
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog.dismiss();
				progressDialog = null;
			}
		});
	} catch(e) {
		toast("createCircle 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function createCylinder(type, x, y, z, id, radius, height) {
	try {
		//프로그래스 다이얼로그 시작
		var progressDialog;
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog = ProgressDialog.show(CTX, josa(type, "을") + " 생성중입니다...", "잠시만 기다려주세요...", true, false);
			}
		});
		
		//var firstPoint = [x - radius, y, z - radius];
		//var secondPoint = [x + radius, y + height, z + radius];
		
		var blockCount  = 0;
		for(var h = 0; h <= height; h++) {
			for(var i = -radius + 1; i < radius; i++) {
				for(var j = -radius + 1; j < radius; j++){
					switch(type) {
						case "원기둥":
							if((i * i) + (j * j) <= (radius * radius)) {
								Level.setTile(x + i, y + h, z + j, id, data);
								blockCount++;
							}
							break;
						case "빈원기둥":
							if((i * i) + (j * j) <= (radius * radius) && (i * i) + (j * j) >= ((radius - 1) * (radius - 1))) {
								Level.setTile(x + i, y + h, z + j, id, data);
								blockCount++;
							}
							break;
					}
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + josa(type, "이") + "생성되었습니다. 총 " + blockCount + "개의 블럭이 변경되었습니다.");
		
		preventFolding();
		
		//프로그래스 다이얼로그 종료
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog.dismiss();
				progressDialog = null;
			}
		});
	} catch(e) {
		toast("createCylinder 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function cover(minPoint, maxPoint, id, data) {
	try {
		//프로그래스 다이얼로그 시작
		var progressDialog;
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog = ProgressDialog.show(CTX, "지정된 영역을 덮는 중입니다...", "잠시만 기다려주세요...", true, false);
			}
		});
		
		var blockCount = 0;
		for(var x = minPoint.x; x <= maxPoint.x; x++) {
			for(var z = minPoint.z; z <= maxPoint.z; z++) {
				for(var y = minPoint.y; y <= maxPoint.y; y++) {
					var block = Level.getTile(x, y, z);
					var topBlock = Level.getTile(x, y, z);
					
					if(block != 0 && topBlock == 0) {
						Level.setTile(x, ++y, z, id, data);
						blockCount++;
						//break;
					}
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 바뀌었습니다.");
		
		preventFolding();
		
		//프로그래스 다이얼로그 종료
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog.dismiss();
				progressDialog = null;
			}
		});
	} catch(e) {
		toast("cover 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function backup(firstPoint, secondPoint) {
	//if(readData("backup") == "false") return;
	/*
	comparePoint(firstPoint, secondPoint);
	backupPoint[backupCount] = new Array(3);
	backupLength[backupCount] = new Array(3);
	
	for(var i = 0; i <= 2; i++) {
		backupPoint[backupCount][i] = minPos[i];
		backupLength[backupCount][i] = maxPos[i]-minPos[i]+1;
	}
	
	backupBlock[backupCount] = new Array();
	
	for(var i = 0; i < backupLength[backupCount][0]; i++) {
		backupBlock[backupCount][i] = new Array();
		for(var j = 0; j < backupLength[backupCount][1]; j++) {
			backupBlock[backupCount][i][j] = new Array();
			for(var k = 0; k < backupLength[backupCount][2]; k++) {
				backupBlock[backupCount][i][j][k] = {id: Level.getTile(minPoint.x + i, minPoint.y + j, minPoint.z + k), data: Level.getData(minPoint.x + i, minPoint.y + j, minPoint.z + k)};
				backupCount++;
			}
		}
	}
	*/
}

function undo() {
	//if(readData("backup") == "false") return;
	
	backupCount --;
	if(backupCount < 0) return;
	
	var blockCount = 0;
	for(var i = 0; i < backupLength[backupCount][0]; i++) {
		for(var j = 0; j < backupLength[backupCount][1]; j++) {
			for(var k = 0; k < backupLength[backupCount][2]; k++) {
				Level.setTile(backupPos[backupCount][0] + i, backupPos[backupCount][1] + j, backupPos[backupCount][2] + k, backupBlock[backupCount][i][j][k].id, backupBlock[backupCount][i][j][k].data);
				blockCount++;
			}
		}
	}
	clientMessage(ChatColor.GREEN + blockCount + "개의 블럭이 복원되었습니다.");
	
	backupBlock.pop(); //마지막 원소 삭제
}