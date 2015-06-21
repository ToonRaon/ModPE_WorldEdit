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
const ScrollView = android.widget.ScrollView;

const SP = android.util.TypedValue.COMPLEX_UNIT_SP;

const View = android.view.View;
const Gravity = android.view.Gravity;
const MotionEvent = android.view.MotionEvent;
const ViewGroup = android.view.ViewGroup;

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
const Typeface = android.graphics.Typeface;

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

const GITHUB_API_TREE_URL = "https://raw.githubusercontent.com/ToonRaon/ModPE_WorldEdit/master/github_api_tree.txt";

const SD_CARD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const RESOURCE_PATH = SD_CARD + "/games/com.mojang/worldedit";
const IMAGE_PATH = RESOURCE_PATH + "/images";
const GUI_PATH = IMAGE_PATH + "/gui";
const ITEM_PATH = IMAGE_PATH + "/items";
const ENTITY_PATH = IMAGE_PATH + "/entities";
const OPTION_PATH = RESOURCE_PATH + "/option";
const FONT_PATH = RESOURCE_PATH + "/fonts";

const OPTION_FILE = OPTION_PATH + "/options.txt";

const NANUM_GOTHIC_FILE = FONT_PATH + "/NanumGothic.ttf";

const INITIAL = 19; //초성 - ㄱ, ㄲ, ㄴ, ㄷ, ㄸ, ㄹ, ㅁ, ㅂ, ㅃ, ㅅ, ㅆ, ㅇ, ㅈ, ㅉ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ
const MEDIAL = 21; //중성 - ㅏ, ㅐ, ㅑ, ㅒ, ㅓ, ㅔ, ㅕ, ㅖ, ㅗ, ㅘ, ㅙ, ㅚ, ㅛ, ㅜ, ㅝ, ㅞ, ㅟ, ㅠ, ㅡ, ㅢ,ㅣ
const FINAL = 28; //종성 - (없음), ㄱ, ㄲ, ㄳ, ㄴ, ㄵ, ㄶ, ㄷ, ㄹ, ㄺ, ㄻ, ㄼ, ㄽ, ㄾ, ㄿ, ㅀ, ㅁ, ㅂ, ㅄ, ㅅ, ㅆ, ㅇ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ
const FIRST_KOREAN_OF_UNICODE = 44032; //유니코드에서 첫번째 한글 문자인 '가'의 고유번호. 44033은 각, 44034는 갂... 과 같은 순서로 55203번째까지 한글이 존재하고있다.

const ViewID = {
	AXE_BUTTON: 100,
	CMD_BUTTON: 101,
	UNDO_BUTTON: 102,
	REDO_BUTTON: 103,
	CLOSE_BUTTON: 104,
	TABLE: 1000
};

//GUI 선언
var hotkeyWindow;
var hotkeyPopupWindow;

var GUIWindow;

var commandCustomDialogWindow;

var mainWindow;

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

var commandDetector = false;

var isScriptable = false;

var checkFilesThread;
var makeGUIWindowThread;

var currentWorldDir = "";

/*
 === backupArray 4차원 배열 구조도 ===
 backupArray = [
	["월드1", [[x, y, z, id, data], [x, y, z, id, data], ....], [[x, y, z, id, data], [x, y, z, id, data], ...], [[x, y, z, id, data], [x, y, z, id, data], ...], ...],
	["월드2", [[x, y, z, id, data], [x, y, z, id, data], ....], [[x, y, z, id, data], [x, y, z, id, data], ...], [[x, y, z, id, data], [x, y, z, id, data], ...], ...],
	["월드3", [[x, y, z, id, data], [x, y, z, id, data], ....], [[x, y, z, id, data], [x, y, z, id, data], ...], [[x, y, z, id, data], [x, y, z, id, data], ...], ...],
	...
 ];
 */
var backupArray = new Array();
var backupIndex = new Array();
var backupWorldNumber;

var getScreenSize = {
	width: ((CTX.getWindowManager().getDefaultDisplay().getRotation() % 2 == 0) ? CTX.getWindowManager().getDefaultDisplay().getHeight() : CTX.getWindowManager().getDefaultDisplay().getWidth()),
	height: ((CTX.getWindowManager().getDefaultDisplay().getRotation() % 2 == 0) ? CTX.getWindowManager().getDefaultDisplay().getWidth() : CTX.getWindowManager().getDefaultDisplay().getHeight()),
	
	
	getWidth: function() {
		return this.width;
	},
	getHeight: function() {
		return this.height;
	}
}

var commands = [
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
	"덮기",
	"회전 90"
];

var resourceLocalFilesNameList = new Array(); //로컬 리소스 파일들의 이름만 저장할 배열

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
	showWindow(hotkeyWindow, Gravity.RIGHT | Gravity.TOP, 0, dip2px(70));
	showWindow(hotkeyPopupWindow, Gravity.RIGHT | Gravity.TOP, 0 + dip2px(36), dip2px(70));
	
	//메인 윈도우
	showWindow(mainWindow, Gravity.LEFT | Gravity.TOP, 0, 0);
	
	//월드디렉토리
	currentWorldDir = Level.getWorldDir();
	
	//백업 세팅
	backupSetting();
	
	//초기화
	firstPoint = {x: null, y: null, z: null};
	secondPoint = {x: null, y: null, z: null};
}

function leaveGame() {
	if(!isScriptable) //파일 누락 등의 이유로 스크립트 사용불가 상태
			return;
	
	//단축 윈도우 종료
	closeWindow(hotkeyWindow);
	
	//메인 윈도우 종료
	closeWindow(mainWindow);
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
	try {
		if(!isScriptable) //파일 누락 등의 이유로 스크립트 사용불가 상태
				return;
		
		clientMessage("<" + Player.getName(Player.getEntity()) + "> /" + command);
		command = command.split(" ");
		
		var unnecessaryPointCommands = ["구", "반구", "빈구", "빈반구", "역반구", "역빈반구", "원", "빈원", "원기둥", "빈원기둥", "붙여넣기"]; //영역을 지정해줄 필요가 없는 명령어
		var isPointNecessary = true;
		for each(var i in unnecessaryPointCommands)
			if(command[0] == i) isPointNecessary = false;
		
		if(isPointNecessary) { //영역 지정이 필요한 명령어
			if(firstPoint.x == null || secondPoint.x == null) {
				clientMessage(ChatColor.RED + "먼저 나무도끼로 두 지점을 지정해주세요.");
				return;
			}
			
			minPoint = comparePoint(0); 
			maxPoint = comparePoint(1);
		}
		
		switch(command[0]) {
			case "채우기":
				if(command[1] == "" || command[1] == undefined) { //인수 미설정
					clientMessage(ChatColor.GREEN + "[HELP] /채우기 <아이디:데이터>");
					return;
				} else {
					var id = parseInt(command[1].split(":")[0]);
					var data = (command[1].indexOf(":") != -1 ? parseInt(command[1].split(":")[1]) : 0);
					fill(minPoint, maxPoint, id, data);
				}
				break;
			
			case "벽":
				if(command[1] == "" || command[1] == undefined) { //인수 미설정
					clientMessage(ChatColor.GREEN + "[HELP] /벽 <아이디:데이터>");
					return;
				} else {
					var id = parseInt(command[1].split(":")[0]);
					var data = (command[1].indexOf(":") != -1 ? parseInt(command[1].split(":")[1]) : 0);
					wall(minPoint, maxPoint, id, data);
				}
				break;
			
			case "비우기":
				fill(minPoint, maxPoint, 0, 0);
				break;
			
			case "바꾸기":
				if(command[1] == "" || command[1] == undefined || command[2] == "" || command[2] == undefined) { //인수 미설정
					clientMessage(ChatColor.GREEN + "[HELP] /바꾸기 <바뀔아이디:바뀔데이터> <바꿀아이디:바꿀데이터>");
					return;
				} else {
					var fromId = parseInt(command[1].split(":")[0]);
					var fromData = (command[1].indexOf(":") != -1 ? parseInt(command[1].split(":")[1]) : 0);
					var toId = parseInt(command[2].split(":")[0]);
					var toData = (command[2].indexOf(":") != -1 ? parseInt(command[2].split(":")[1]) : 0);
					
					replace(minPoint, maxPoint, fromId, fromData, toId, toData);
				}
				break;
			
			case "벽바꾸기":
				if(command[1] == "" || command[1] == undefined || command[2] == "" || command[2] == undefined) { //인수 미설정
					clientMessage(ChatColor.GREEN + "[HELP] /벽바꾸기 <바뀔아이디:바뀔데이터> <바꿀아이디:바꿀데이터>");
					return;
				} else {
					var fromId = parseInt(command[1].split(":")[0]);
					var fromData = (command[1].indexOf(":") != -1 ? parseInt(command[1].split(":")[1]) : 0);
					var toId = parseInt(command[2].split(":")[0]);
					var toData = (command[2].indexOf(":") != -1 ? parseInt(command[2].split(":")[1]) : 0);
					
					wallReplace(minPoint, maxPoint, fromId, fromData, toId, toData);
				}
				break;
			
			case "남기기":
				if(command[1] == "" || command[1] == undefined || command[2] == "" || command[2] == undefined) { //인수 미설정
					clientMessage(ChatColor.GREEN + "[HELP] /남기기 <남길아이디:남길데이터> <바꿀아이디:바꿀데이터>");
					return;
				} else {
					var fromId = parseInt(command[1].split(":")[0]);
					var fromData = (command[1].indexOf(":") != -1 ? parseInt(command[1].split(":")[1]) : 0);
					var toId = parseInt(command[2].split(":")[0]);
					var toData = (command[2].indexOf(":") != -1 ? parseInt(command[2].split(":")[1]) : 0);
					
					preserve(minPoint, maxPoint, fromId, fromData, toId, toData);
				}
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
				if(command[1] == "" || command[1] == undefined || command[2] == "" || command[2] == undefined) { //인수 미설정
					clientMessage(ChatColor.GREEN + "[HELP] /" + command[1] + " <아이디:데이터> <반지름>");
					return;
				} else {
					var id = parseInt(command[1].split(":")[0]);
					var data = (command[1].indexOf(":") != -1 ? parseInt(command[1].split(":")[1]) : 0);
					var radius = parseInt(command[2]);
					
					createSphere(command[0], Math.floor(Player.getX()), Math.floor(Player.getY() - 1), Math.floor(Player.getZ()), id, data, radius);
				}
				break;
			
			case "원":
			case "빈원":
				if(command[1] == "" || command[1] == undefined || command[2] == "" || command[2] == undefined) { //인수 미설정
					clientMessage(ChatColor.GREEN + "[HELP] /" + command[1] + " <아이디:데이터> <반지름>");
					return;
				} else {
					var id = parseInt(command[1].split(":")[0]);
					var data = (command[1].indexOf(":") != -1 ? parseInt(command[1].split(":")[1]) : 0);
					var radius = parseInt(command[2]);
					
					createCircle(command[0], Math.floor(Player.getX()), Math.floor(Player.getY() - 1), Math.floor(Player.getZ()), id, data, radius);
				}
				break;
			
			case "원기둥":
			case "빈원기둥":
				if(command[1] == "" || command[1] == undefined || command[2] == "" || command[2] == undefined || command[3] == "" || command[3] == undefined) { //인수 미설정
					clientMessage(ChatColor.GREEN + "[HELP] /" + command[1] + " <아이디:데이터> <반지름> <높이>");
					return;
				} else {
					var id = parseInt(command[1].split(":")[0]);
					var data = (command[1].indexOf(":") != -1 ? parseInt(command[1].split(":")[1]) : 0);
					var radius = parseInt(command[2]);
					var height = parseInt(command[3]);
					
					createCylinder(command[0], Math.floor(Player.getX()), Math.floor(Player.getY() - 1), Math.floor(Player.getZ()), id, data, radius, height);
				}
				break;
			
			case "길이":
				getAreaLength(minPoint, maxPoint);
				break;
			
			case "덮기":
				if(command[1] == "" || command[1] == undefined) { //인수 미설정
					clientMessage(ChatColor.GREEN + "[HELP] /덮기 <아이디:데이터>");
					return;
				} else {
					var id = parseInt(command[1].split(":")[0]);
					var data = (command[1].indexOf(":") != -1 ? parseInt(command[1].split(":")[1]) : 0);
					
					cover(minPoint, maxPoint, id, data);
				}
				break;
			
			case "회전":
				if(command[1] == "" || command[1] == undefined) { //인수 미설정
					clientMessage(ChatColor.GREEN + "[HELP] /회전 <회전각도>");
					return;
				} else {
					var degree = parseInt(command[1]);
					
					rotate(degree);
				}
				break;
		}
	} catch(e) {
		toast(e, 1);
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
	//폴더 체크
	checkDirectories();
	
	//파일 체크
	checkFiles(); 
	
	new Thread(new Runnable() {
		run: function() {
			try {
				if(checkFilesThread != null)
					checkFilesThread.join();
				
				if(isScriptable) { //리소스 파일 존재
					//단축버튼 생성
					makeHotkeyWindow();
					
					//커맨드 커스텀 다이얼로그 윈도우 생성
					commandCustomDialogWindow = commandCustomDialog(false);
					
					//GUI 생성
					makeGUIWindow();
					if(makeGUIWindowThread != null)
						makeGUIWindowThread.join();
					
					//메인 버튼 생성
					makeMainWindow();
					
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

function getFilesListFromGitHub(path, recursive, url) {
	if(getInternetStatus().equals("Offline")) //오프라인이면 리턴
		return undefined;
	
	var fileList = new Array();
	
	if(path == undefined) //path 파라미터가 넘어오지 않은 경우
		path = ""; //최상위 루트 폴더
	
	try {
		var temp = JSON.parse(readURL(url));
	} catch(e) {
		toast(e, 1);
	}
	
	if(path != undefined) { //path가 별도로 지정이 된 경우 해당 폴더의 하위 파일만 저장
		for(var i in temp.tree) {
			var file = temp.tree[i];
			
			if(file.path.indexOf(path + "/") != -1) { //원소의 경로가 주어진 path의 하위 폴더인 경우
				if(file.type =="blob") { //원소의 유형이 파일일 때
					if(recursive) { //해당 path의 하위 폴더의 파일들도 모두 읽을 때
						var fileInfo = {
							"name": (file.path.split("/")[file.path.split("/").length - 1]), //파일이름 == path를 /로 split 하였을 때 마지막 원소
							"path": file.path,
							"sha": file.sha,
							"size": parseInt(file.size),
							"url": file.url
						};
						
						fileList.push(fileInfo);
					} else if(!recursive) { //해당 path의 하위 폴더의 파일들을 읽지 않을 때
						if( ( file.path.split(path + "/").slice(1).join(path + "/") ).indexOf("/") != -1 ) { //해당 파일의 상위 경로가 path뿐일 때
							var fileInfo = {
								"name": (file.path.split("/")[file.path.split("/").length - 1]), //파일이름 == path를 /로 split 하였을 때 마지막 원소
								"path": file.path,
								"sha": file.sha,
								"size": parseInt(file.size),
								"url": file.url
							};
							
							fileList.push(fileInfo);
						}
					}
				}
			}
		}
	} else { //path가 지정이 되지 않은 경우 - 최상위 루트 폴더
		fileList = temp.tree;
	}
	
	return fileList;
}

function getFilesListFromLocal(path, recursive, savedFileList) {
	var fileList = ((savedFileList != undefined) ? savedFileList : new Array());
	var temp = new Array(); //내부 저장소 파일 리스트를 임시로 저장할 배열
	
	if(savedFileList == undefined) //함수 제일 첫 호출시에만 초기화
		resourceLocalFilesNameList = new Array();
	
	temp = File(path).list();
	
	for(var i in temp) {
		if(File(path, temp[i]).isFile()) { //리스트의 원소가 파일이면
			var fileInfo = {
				"name": ( temp[i] + "" ), //파일 이름
				"path": path + "/" + temp[i], //파일 경로
				"size": parseInt(File(path, temp[i]).length()) //파일 크기
			};
			resourceLocalFilesNameList.push(temp[i] + ""); 
			
			fileList.push(fileInfo); //파일 배열에 파일 정보 추가
		} else if(File(path, temp[i]).isDirectory() && recursive) { //리스트의 원소가 폴더라면
			getFilesListFromLocal(path + "/" + temp[i], true, fileList); //재귀적으로 파일 리스트 불러옴
		}
	}
	
	return fileList;
}

function createButton(text, size, font, fontColor, width, height, backgroundNormal, backgroundPressed) {
	var button = new Button(CTX);
	if(text != null)
		button.setText(text);
	if(size != null)
		button.setTextSize(SP, size);
	if(font != null)
		button.setTypeface(new Typeface.createFromFile(font));
	if(fontColor != null)
		button.setTextColor(fontColor);
	if(backgroundNormal != null)
		button.setBackground(Drawable.createFromPath(GUI_PATH + "/" + backgroundNormal));
	if(backgroundPressed != null) {
		button.setOnTouchListener(new OnTouchListener() {
			onTouch: function(view, event) {
				switch(event.action) {
					//버튼 다운
					case MotionEvent.ACTION_DOWN:
					case MotionEvent.ACTION_MOVE:	
						CTX.runOnUiThread(new Runnable() {
							run: function() {
								button.setBackground(Drawable.createFromPath(GUI_PATH + "/" + backgroundPressed));
							}
						});
						break;
					
					//버튼 업
					case MotionEvent.ACTION_UP:
					case MotionEvent.ACTION_CANCEL:
						CTX.runOnUiThread(new Runnable() {
							run: function() {
								button.setBackground(Drawable.createFromPath(GUI_PATH + "/" + backgroundNormal));
							}
						});
						break;
				}
				
				return false;
			}
		});
	}
	
	var buttonParams = new ViewGroup.MarginLayoutParams(width, height);
	button.setLayoutParams(buttonParams);
	
	return button;
}

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

function checkDirectories() {
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
		
		//폰트 폴더
		if(!File(FONT_PATH).exists())
			File(FONT_PATH).mkdirs();
	} catch(e) {
		toast("리소스 폴더를 생성하는 과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function checkFiles() {
	try {
		var resourceLocalFilesList = getFilesListFromLocal(RESOURCE_PATH, true); //로컬의 파일 리스트
		
		var isDownloadAllowed = false;
		var threadFreezer = false;
		var isFilesExisted = true;
		
		if(getInternetStatus().equals("Offline")) { //인터넷 미접속중
			if(resourceLocalFilesList.length == 0) { //로컬 저장소에 파일이 아무 것도 존재하지 않음
				isDownloadAllowed = false;
				isScriptable = false;
				threadFreezer = false;
				isFilesExisted = false;
				
				alertDialog("월드에딧 스크립트 실행 불가능",
					"인터넷에 연결되어 있지 않으며\n" +
					"현재 귀하의 휴대폰에 저장된 리소스 파일이 하나도 존재하지 않습니다.\n" +
					"\n" +
					"리소스 파일을 다운로드 받지 않고는\n" +
					"월드에딧 스크립트를 사용할 수 없습니다." +
					"\n" +
					"인터넷에 연결을 하신 뒤 다시 스크립트를 적용해주세요." +
					"(와이파이 권장)"
				);
				
				return;
			} else if(resourceLocalFilesList.length > 0) { //로컬 저장소에 파일이 있긴 있음
				toast("인터넷에 연결되어 있지 않아 서버에 접속이 불가능합니다. 가급적 인터넷에 연결 후 사용해주세요.", 1);
				
				isDownloadAllowed = false;
				isScriptable = true;
				threadFreezer = false;
				isFilesExisted = true;
				
				return;
			}
		}
		
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
		
		//누락파일 발견 다이얼로그
		var missingFileDialog = new AlertDialog.Builder(CTX);
		missingFileDialog.setTitle("누락된 파일이 존재합니다.");
		missingFileDialog.setMessage(
			"다운로드 되지 않은 리소스 파일(이미지나 소리 파일 등)이 발견되었습니다.\n" +
			"월드에딧 스크립트는 많은 양의 리소스 파일에 의존하고 있습니다.\n" +
			"따라서 리소스 파일이 없을 경우에 스크립트 사용이 불가능합니다.\n" +
			"\n" +
			(
				getInternetStatus() == "Data" ?
				//3G, 4G
				("파일을 다운로드 받으시겠습니까?\n" +
				"현재 3G 혹은 4G로 인터넷에 연결하고 있습니다.\n" +
				"이 상태로 파일을 다운로드하시겠습니까?\n" +
				"\n" +
				"사용 요금제에 따라 요금이 부과될 수 있습니다.")
				:
				//WiFi
				("파일을 다운로드 받으시겠습니까?\n" +
				"현재 WiFi로 인터넷에 연결하고 있습니다.\n" +
				"파일을 다운로드하시겠습니까?")
			)
		);
		missingFileDialog.setPositiveButton("설치", listener);
		missingFileDialog.setNegativeButton("취소", listener);
		missingFileDialog.setCancelable(false);
		
		var resourceFilesList = getFilesListFromGitHub("res", true, GITHUB_API_TREE_URL); //서버의 파일 리스트
		
		var missingFilesList = new Array(); //누락된 파일 리스트
		var missingFilesTotalSize = 0;
		
		checkFilesThread = new Thread(new Runnable() {
			run: function() {
				try {
					for(var i in resourceFilesList) {
						//로컬 저장소의 파일 중 name이 같은 것이 있는지를 찾아냄
						if(resourceLocalFilesNameList.indexOf(resourceFilesList[i].name) == -1) { //로컬에 파일 없을 때
							var fileInfo = {
								"name": resourceFilesList[i].name,
								"download_url": "https://raw.githubusercontent.com/ToonRaon/ModPE_WorldEdit/master/" + resourceFilesList[i].path,
								"local_path": ( RESOURCE_PATH + resourceFilesList[i].path.replace("res", "") ),
								"size": resourceFilesList[i].size
							};
							
							missingFilesList.push(fileInfo);
							missingFilesTotalSize += resourceFilesList[i].size;
						}
					}
					
					if(missingFilesList.length == 0) { //모든 파일 존재
						isScriptable = true;
						isFilesExisted = true;
					} else if(missingFilesList.length > 0) { //누락 파일이 존재
						//다운로드 의사 묻기
						CTX.runOnUiThread(new Runnable() {
							run: function() {
								missingFileDialog.show();
							}
						});
						
						threadFreezer = true;
						//다운로드 의사 결정하기 전까지 프리징
						freezer = new Thread(new Runnable() {
							run: function() {
								while(threadFreezer) {
									Thread.sleep(1);
								}
							}
						});
						freezer.start();
						freezer.join();
						
						//이 코드는 사용자로부터 응답(다이얼로그 버튼 선택)을 받은 후 실행됩니다.
						if(isDownloadAllowed) { //다운로드 허락		
							//리소스 파일 다운로드 알림 다이얼로그
							var progressDialog;
							CTX.runOnUiThread(new Runnable() {
								run: function() {
									progressDialog = ProgressDialog.show(CTX, "리소스 파일 다운로드 중", "잠시만 기다려주세요...", true, false);
								}
							});
							
							var currentProgress = 0;
							var totalProgress = missingFilesTotalSize;
							
							for(var i in missingFilesList) {
								//파일 다운로드
								downloadFileFromURL(missingFilesList[i].download_url, missingFilesList[i].local_path, missingFilesList[i].name);
								var downloadThread = new Thread(new Runnable() {
									run: function() {
										var size; //다운로드 중인 파일의 현재 크기
										while((size = File(missingFilesList[i].local_path).length()) < missingFilesList[i].size) { //다운로드가 덜 된 경우
											//Thread.sleep(1);
											
											CTX.runOnUiThread(new Runnable() {
												run: function() {
													var progressString = "파일을 다운로드 중 입니다. " + ( ( currentProgress + size ) / totalProgress * 100 ).toFixed(2) + "%\n" + missingFilesList[i].name;
													
													progressDialog.setMessage(progressString);
												}
											});
										}
									}
								});
								downloadThread.start();
								downloadThread.join();
								
								currentProgress += missingFilesList[i].size;
							}
						} else if(!isDownloadAllowed) { //다운로드 거부됨
							//Do nothing 
						}
						
						//프로그래스 다이얼로그 종료
						if(progressDialog != null) {
							CTX.runOnUiThread(new Runnable() {
								run: function() {
									progressDialog.dismiss();
									progressDialog = null;
								}
							});
						}
					}
				} catch(e) {
					toast("파일을 체크하는 도중 오류가 발생했습니다.\n" + e, 1);
					
					//프로그래스 다이얼로그 종료
					if(progressDialog != null) {
						CTX.runOnUiThread(new Runnable() {
							run: function() {
								progressDialog.dismiss();
								progressDialog = null;
							}
						});
					}
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
		request.setDestinationInExternalPublicDir(path.replace(SD_CARD, "").replace(fileName, ""), fileName); //setDestinationInExternalPublicDir에서 디렉토리 인자는 getExternalFilesDir(String);으로 넘어가기 때문에 절대경로를 제외한 폴더를 사용
		
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
	
	//readURL()을 Thread에서 돌릴 때 너무 많은 데이터를 읽으려 할 경우 오류가 남.
	//정확한 버그 발생 이유 및 수정 방안은 아직 모름
	try {
		var URLContent = "";
		var bufferedReader = new BufferedReader(new InputStreamReader(URL(url).openStream(), "UTF-8"));
		
		while ((temp = bufferedReader.readLine()) != null) {
			URLContent += (URLContent == "" ? temp :  "\n" + temp);
		}
		bufferedReader.close();
	} catch (e) {
		toast(e, 1);
	}
	
	//UTF-8 인코딩 과정에서 생길 수 있는 BOM 문자 제거 (for JSON)
	if(URLContent.indexOf(String.fromCharCode(65279)) != -1)
		URLContent.slice(1);
	
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

function makeHotkeyWindow() {
	CTX.runOnUiThread(new Runnable({
		run: function() {
			try {
				//---------- Hotkey Button 부분 ----------//
				
				var hotkeyButtonLayout = new LinearLayout(CTX);
				hotkeyButtonLayout.setOrientation(1);
				//hotkeyButtonLayout.setBackgroundColor(Color.WHITE);
				
				//도끼버튼 속성
				var axeButtonParams = new LinearLayout.LayoutParams(dip2px(30), dip2px(30));
				axeButtonParams.setMargins(0, 0, dip2px(3), dip2px(3));
				//axeButtonParams.addRule(RelativeLayout.ALIGN_PARENT_TOP);
				//axeButtonParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
				
				//도끼버튼
				var axeButton = new Button(CTX);
				axeButton.setAlpha(0.7);
				axeButton.setBackground(Drawable.createFromPath(GUI_PATH + "/axe_button_normal.png"));
				axeButton.setId(ViewID.AXE_BUTTON);
				hotkeyButtonLayout.addView(axeButton, axeButtonParams);
				
				//커맨드버튼 속성
				var cmdButtonParams = new LinearLayout.LayoutParams(dip2px(30), dip2px(30));
				cmdButtonParams.setMargins(0, 0, dip2px(3), dip2px(3));
				//cmdButtonParams.addRule(RelativeLayout.BELOW, ViewID.AXE_BUTTON);
				//cmdButtonParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
				
				//커맨드버튼
				var cmdButton = new Button(CTX);
				cmdButton.setAlpha(0.7);
				cmdButton.setBackground(Drawable.createFromPath(GUI_PATH + "/command_button_normal.png"));
				cmdButton.setId(ViewID.CMD_BUTTON);
				hotkeyButtonLayout.addView(cmdButton, cmdButtonParams);
				
				//되돌리기버튼 속성
				var undoButtonParams = new LinearLayout.LayoutParams(dip2px(30), dip2px(30));
				undoButtonParams.setMargins(0, 0, dip2px(3), dip2px(3));
				//undoButtonParams.addRule(RelativeLayout.BELOW, ViewID.CMD_BUTTON);
				//undoButtonParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
				
				//되돌리기버튼
				var undoButton = new Button(CTX);
				undoButton.setAlpha(0.7);
				undoButton.setBackground(Drawable.createFromPath(GUI_PATH + "/undo_button_normal.png"));
				undoButton.setId(ViewID.UNDO_BUTTON);
				hotkeyButtonLayout.addView(undoButton, undoButtonParams);
				
				//다시실행버튼 속성
				var redoButtonParams = new LinearLayout.LayoutParams(dip2px(30), dip2px(30));
				redoButtonParams.setMargins(0, 0, dip2px(3), dip2px(3));
				//redoButtonParams.addRule(RelativeLayout.BELOW, ViewID.UNDO_BUTTON);
				//redoButtonParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
				
				//다시실행버튼
				var redoButton = new Button(CTX);
				redoButton.setAlpha(0.7);
				redoButton.setBackground(Drawable.createFromPath(GUI_PATH + "/redo_button_normal.png"));
				redoButton.setId(ViewID.REDO_BUTTON);
				hotkeyButtonLayout.addView(redoButton, redoButtonParams);
				
				//버튼 터치 리스너
				var buttonOnTouchListener = new OnTouchListener({
					onTouch: function(view, event) {
						switch(event.action) {
							//버튼 다운
							case MotionEvent.ACTION_DOWN:
							case MotionEvent.ACTION_MOVE:
								if(view == axeButton) {
									axeButton.setBackground(Drawable.createFromPath(GUI_PATH + "/axe_button_pressed.png"));
									axeButtonPopup.setAlpha(1);
								} else if(view == cmdButton) {
									cmdButton.setBackground(Drawable.createFromPath(GUI_PATH + "/command_button_pressed.png"));
									cmdButtonPopup.setAlpha(1);
								} else if(view == undoButton) {
									undoButton.setBackground(Drawable.createFromPath(GUI_PATH + "/undo_button_pressed.png"));
									undoButtonPopup.setAlpha(1);
								} else if(view == redoButton) {
									redoButton.setBackground(Drawable.createFromPath(GUI_PATH + "/redo_button_pressed.png"));
									redoButtonPopup.setAlpha(1);
								}
								break;
							
							//버튼 업
							case MotionEvent.ACTION_UP:
								if(view == axeButton) {
									axeButton.setBackground(Drawable.createFromPath(GUI_PATH + "/axe_button_normal.png"));
									axeButtonPopup.setAlpha(0);
								} else if(view == cmdButton) {
									cmdButton.setBackground(Drawable.createFromPath(GUI_PATH + "/command_button_normal.png"));
									cmdButtonPopup.setAlpha(0);
								} else if(view == undoButton) {
									undoButton.setBackground(Drawable.createFromPath(GUI_PATH + "/undo_button_normal.png"));
									undoButtonPopup.setAlpha(0);
								} else if(view == redoButton) {
									redoButton.setBackground(Drawable.createFromPath(GUI_PATH + "/redo_button_normal.png"));
									redoButtonPopup.setAlpha(0);
								}
								break;
						}
						return false;
					}
				});
				axeButton.setOnTouchListener(buttonOnTouchListener);
				cmdButton.setOnTouchListener(buttonOnTouchListener);
				undoButton.setOnTouchListener(buttonOnTouchListener);
				redoButton.setOnTouchListener(buttonOnTouchListener);
				
				//버튼 온클릭 리스너
				var buttonOnClickListener = new OnClickListener({
					onClick: function(view) {
						switch(view) {
							case axeButton:
								Entity.setCarriedItem(Player.getEntity(), 271, 1, 0); //나무도끼 지급
								toast("블럭을 짧게 터치 : 지점1 설정\n블럭을 꾹~ 터치 : 지점2 설정");
								break;
							
							case cmdButton:
								makeCommandWindow();
								break;
							
							case undoButton:
								undo();
								break;
								
							case redoButton:
								redo();
								break;
						}
					}
				});
				axeButton.setOnClickListener(buttonOnClickListener);
				cmdButton.setOnClickListener(buttonOnClickListener);
				undoButton.setOnClickListener(buttonOnClickListener);
				redoButton.setOnClickListener(buttonOnClickListener);
				
				hotkeyWindow = new PopupWindow(hotkeyButtonLayout, -2, -2);
				
				
				
				//---------- Hotkey Popup 부분 ----------//
				
				var hotkeyPopupLayout = new RelativeLayout(CTX);
				
				//도끼버튼 팝업설명 속성
				var axeButtonPopupParams = new RelativeLayout.LayoutParams(-2, -2);
				axeButtonPopupParams.setMargins(0, 0, 0, 0);
				axeButtonPopupParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
				
				//도끼버튼 팝업 설명
				var axeButtonPopup = new TextView(CTX);
				axeButtonPopup.setText("[나무 도끼]\n현재 들고 있는 아이템을 나무도끼로 변경합니다.\n아무런 아이템도 쥐고있지 않은 경우 효과가 없습니다.\n\n나무도끼를 들고 블럭을 짧게 터치하면 해당 블럭의 위치가 지점1로,\n블럭을 (마치 부수는 것처럼) 길게 터치하면 해당 블럭의 위치가 지점2로 설정됩니다.");
				axeButtonPopup.setTextSize(SP, 10);
				axeButtonPopup.setTypeface(new Typeface.createFromFile(NANUM_GOTHIC_FILE));
				axeButtonPopup.setAlpha(0);
				axeButtonPopup.setBackgroundColor(Color.BLACK);
				axeButtonPopup.setPadding(dip2px(5), dip2px(5), dip2px(5), dip2px(5));
				hotkeyPopupLayout.addView(axeButtonPopup, axeButtonPopupParams);
				
				
				//커맨드버튼 팝업 설명 속성
				var cmdButtonPopupParams = new RelativeLayout.LayoutParams(-2, -2);
				cmdButtonPopupParams.setMargins(0, dip2px(33), 0, 0);
				cmdButtonPopupParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
				
				//커맨드버튼 팝업 설명
				var cmdButtonPopup = new TextView(CTX);
				cmdButtonPopup.setText("[명령어 버튼]\n명령어를 GUI를 통해서 쉽게 사용할 수 있습니다.");
				cmdButtonPopup.setTextSize(SP, 10);
				cmdButtonPopup.setTypeface(new Typeface.createFromFile(NANUM_GOTHIC_FILE));
				cmdButtonPopup.setAlpha(0);
				cmdButtonPopup.setBackgroundColor(Color.BLACK);
				cmdButtonPopup.setPadding(dip2px(5), dip2px(5), dip2px(5), dip2px(5));
				hotkeyPopupLayout.addView(cmdButtonPopup, cmdButtonPopupParams);
				
				//되돌리기버튼 팝업 설명 속성
				var undoButtonPopupParams = new RelativeLayout.LayoutParams(-2, -2);
				undoButtonPopupParams.setMargins(0, dip2px(33) * 2, 0, 0);
				undoButtonPopupParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
				
				//되돌리기버튼 팝업 설명
				var undoButtonPopup = new TextView(CTX);
				undoButtonPopup.setText("[되돌리기 버튼]\n최근 작업을 취소합니다.");
				undoButtonPopup.setTextSize(SP, 10);
				undoButtonPopup.setTypeface(new Typeface.createFromFile(NANUM_GOTHIC_FILE));
				undoButtonPopup.setAlpha(0);
				undoButtonPopup.setBackgroundColor(Color.BLACK);
				undoButtonPopup.setPadding(dip2px(5), dip2px(5), dip2px(5), dip2px(5));
				hotkeyPopupLayout.addView(undoButtonPopup, undoButtonPopupParams);
				
				//다시실행버튼 팝업 설명 속성
				var redoButtonPopupParams = new RelativeLayout.LayoutParams(-2, -2);
				redoButtonPopupParams.setMargins(0, dip2px(33) * 3, 0, 0);
				redoButtonPopupParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
				
				//다시실행버튼 팝업 설명
				var redoButtonPopup = new TextView(CTX);
				redoButtonPopup.setText("[다시실행 버튼]\n최근 작업을 다시 실행합니다.");
				redoButtonPopup.setTextSize(SP, 10);
				redoButtonPopup.setTypeface(new Typeface.createFromFile(NANUM_GOTHIC_FILE));
				redoButtonPopup.setAlpha(0);
				redoButtonPopup.setBackgroundColor(Color.BLACK);
				redoButtonPopup.setPadding(dip2px(5), dip2px(5), dip2px(5), dip2px(5));
				hotkeyPopupLayout.addView(redoButtonPopup, redoButtonPopupParams);
				
				hotkeyPopupWindow = new PopupWindow(hotkeyPopupLayout, -2, -2);
				hotkeyPopupWindow.setTouchable(false);
			} catch(e) {
				toast("단축 버튼 윈도우를 생성하는 과정에서 오류가 발생했습니다,\n" + e, 1);
			}
		}
	}));
}

function makeMainWindow() {
	try {
	//메인 레이아웃
	var mainLayout = new RelativeLayout(CTX);
	
	//메인 버튼
	var mainButton = new Button(CTX);
	mainButton.setBackground(new BitmapDrawable(new BitmapFactory.decodeFile(GUI_PATH + "/main_icon.png")));
	mainButton.setOnClickListener(new OnClickListener() {
		onClick: function() {
			toast("asd");
		}
	});
	
	//메인 버튼 속성
	var mainButtonParams = new RelativeLayout.LayoutParams(dip2px(50), dip2px(50));
	
	mainLayout.addView(mainButton, mainButtonParams);
	
	//메인 윈도우
	mainWindow = new PopupWindow(mainLayout, -2, -2);
	} catch(e) {
		toast("메인 윈도우 생성과정에서 에러 발생!\n" + e, 1);
	}
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
				Level.setTile(x, y, z, block, blockData);
			} catch(e) {
				toast(e, 1);
			}
		}
	}).start();
}

function makeCommandWindow() {
	CTX.runOnUiThread(new Runnable({
		run: function() {
			try {
				showWindow(commandCustomDialogWindow, Gravity.CENTER, 0, 0);
				
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
						
						commandDetector = true;
						
						GUIWindow.setOnDismissListener(null);
					}
				}));
				break;
			
			case "길이": //setTile()과 GUI창을 쓰지않는 명령어
				commandDetector = true;
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
			
			case "회전90":
				commandDetector = true;
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
			
			case "길이":
				getAreaLength(minPoint, maxPoint);
				break;
			
			case "덮기":
				cover(minPoint, maxPoint, selectedItemId, selectedItemData);
				selectedItemId = null;
				selectedItemData = null;
				break;
			
			case "회전90":
				rotate(90);
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
				var source = new BitmapFactory.decodeFile(GUI_PATH + "/table.png");
				table.setImageBitmap(new Bitmap.createScaledBitmap(source, dip2px(630), dip2px(350), true));
				table.setId(ViewID.TABLE);
				rLayout.addView(table, tableParams);
				
				var vLayout = new Array();
				
				//아이템, 블럭 버튼 생성
				var files = getAllImageFiles(ITEM_PATH);
				var currentPage = 0;
				vLayout = makeItemButtons(files, rLayout, vLayout, currentPage, progressDialog);
				
				var ButtonOnTouchListener = new  OnTouchListener({
					onTouch: function(view, event) {
						var source;
						
						switch(event.action) {
							case MotionEvent.ACTION_DOWN:
							case MotionEvent.ACTION_MOVE:
								if(view == prevButton)
									source = new BitmapFactory.decodeFile(GUI_PATH + "/prev_button_pressed.png");
								else if(view == nextButton)
									source = new BitmapFactory.decodeFile(GUI_PATH + "/next_button_pressed.png");
								break;
							
							case MotionEvent.ACTION_UP:
								if(view == prevButton)
									source = new BitmapFactory.decodeFile(GUI_PATH + "/prev_button_normal.png");
								else if(view == nextButton)
									source = new BitmapFactory.decodeFile(GUI_PATH + "/next_button_normal.png");
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
				pageTextParams.addRule(RelativeLayout.ALIGN_BOTTOM, ViewID.TABLE);
				pageTextParams.addRule(RelativeLayout.ALIGN_RIGHT, ViewID.TABLE);
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
				var prevButtonSource = new BitmapFactory.decodeFile(GUI_PATH + "/prev_button_normal.png");
				prevButton.setBackground(new BitmapDrawable(prevButtonSource));
				arrowLayout.addView(prevButton, arrowButtonParams);
				
				var nextButton = new Button(CTX);
				nextButton.setOnTouchListener(ButtonOnTouchListener);
				nextButton.setOnClickListener(ButtonOnClickListener);
				var nextButtonSource = new BitmapFactory.decodeFile(GUI_PATH + "/next_button_normal.png");
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

function getAllImageFiles(path) {
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
			if(i == 383) continue; //예외 - 소환 에그
			
			if(files.indexOf(i + "-0.png") == -1 && Item.getName(i, 0, true).indexOf("Missing") == -1) {
				var j = 0;
				
				while(Item.getName(i, j, true).indexOf("Missing") == -1) {
					if(j > 255) //예외상황에서 과도한 무한루프 방지
						break;
					
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
					var src = new BitmapFactory.decodeFile(ITEM_PATH + "/" + files[id]);
					
					var itemImage = new ImageView(CTX);
					itemImage.setId(id);
					itemImage.setPadding(0, 0, 0, 0);
					if(files[id] != null) {
						if(File(ITEM_PATH, files[id]).exists()) {
							itemImage.setImageBitmap(new Bitmap.createScaledBitmap(src, dip2px(50), dip2px(50), true));
						} else
							itemImage.setImageBitmap(new Bitmap.createScaledBitmap(new BitmapFactory.decodeFile(ITEM_PATH + "/no_image.png"), dip2px(50), dip2px(50), true));
						
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
		toast("아이템 버튼 생성 도중 오류가 발생했습니다. \n" + e, 1);
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
				layout.setOrientation(1);
				
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
								toast(radius + " " + height);
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
		josa = ((finalCode % (MEDIAL * FINAL)) % FINAL == 0 ? "가" : "이");
	else if(josa == "은" || josa == "는")
		josa = ((finalCode % (MEDIAL * FINAL)) % FINAL == 0 ? "는" : "은");
	else if(josa == "을" || josa == "를")
		josa = ((finalCode % (MEDIAL * FINAL)) % FINAL == 0 ? "를" : "을");
	else if(josa == "와" || josa == "과")
		josa = ((finalCode % (MEDIAL * FINAL)) % FINAL == 0 ? "와" : "과");
	
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

function readLocalTextFile(path) {
	try {
		var fileInputStream = new FileInputStream(File(path));
		var inputStreamReader = new InputStreamReader(fileInputStream);
		var bufferedReader = new BufferedReader(inputStreamReader);
		
		var content = "";
		while((temp = bufferedReader.readLine()) != null) {
			content = ( content == "" ? temp : ("\n" + temp) );
		}
		
		fileInputStream.close();
		inputStreamReader.close();
		bufferedReader.close();
		
		return content;
	} catch(e) {
		toast("로컬 텍스트 파일을 불러오는 과정에서 오류가 발생했습니다.\n" + e, 1);
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

function commandCustomDialogItems(dialogWindow, contentLayout) {
	var layoutArray = new Array(commands.length);
		
	for(var i in commands) {
		layoutArray[i] = new LinearLayout(CTX);
		layoutArray[i].setOrientation(1);
		
		var commandNameButton = createButton(commands[i], 20, NANUM_GOTHIC_FILE, Color.WHITE, -1, -2, "item_background_normal.png", "item_background_pressed.png");
		commandNameButton.setPadding(dip2px(10), dip2px(10), dip2px(10), dip2px(10));
		
		var nameViewListener = new OnClickListener() {
			onClick: function(view) {
				var command = (view.getText().toString() + "").replace(/ /gi, "");
				var unnecessaryPointCommands = ["구", "반구", "빈구", "빈반구", "역반구", "역빈반구", "원", "빈원", "원기둥", "빈원기둥", "붙여넣기", "회전90"]; //영역을 지정해줄 필요가 없는 명령어
				
				var isPointNecessary = true;
				for each(var i in unnecessaryPointCommands)
					if(command == i) isPointNecessary = false;
				
				if(isPointNecessary) { //영역 지정이 필요한 명령어
					if(firstPoint.x == null || secondPoint.x == null) {
						clientMessage(ChatColor.RED + "먼저 나무도끼로 두 지점을 지정해주세요.");
						return;
					}
					
					minPoint = comparePoint(0); 
					maxPoint = comparePoint(1);
				}
				
				chooseItemOnGUI(command); //GUI 창에서 블럭이나 아이템을 선택
				
				CTX.runOnUiThread(new Runnable() {
					run: function() {
						dialogWindow.dismiss();
					}
				});
			}
		}
		commandNameButton.setOnClickListener(nameViewListener);
		layoutArray[i].addView(commandNameButton);
		
		if(Number(i) != Number(commands.length - 1)) {
			var horizontalLine = new View(CTX);
			horizontalLine.setBackgroundColor(Color.GRAY);
			layoutArray[i].addView(horizontalLine, new LinearLayout.LayoutParams(-1, dip2px(1)));
		}
		
		contentLayout.addView(layoutArray[i]);
	}
	
	//return contentLayout;
}

function commandCustomDialog(outsideTouchable) {
	try {
		//최상위 레이아웃
		var parentLayout = new RelativeLayout(CTX);
		
		var window = new PopupWindow(parentLayout, -1, -1);
		
		var backgroundLayout = new RelativeLayout(CTX);
		backgroundLayout.setBackgroundColor(Color.argb(128, 0, 0, 0));
		backgroundLayout.setOnClickListener(new OnClickListener() {
			onClick: function() {
				CTX.runOnUiThread(new Runnable() {
					run: function() {
						if(outsideTouchable)
							window.dismiss();
					}
				});
			}
		});
		parentLayout.addView(backgroundLayout, -1, -1);
		
		var mainLayoutParams = new RelativeLayout.LayoutParams(getScreenSize.getWidth() * (2 / 3), -1);
		mainLayoutParams.addRule(RelativeLayout.CENTER_HORIZONTAL);
		mainLayoutParams.setMargins(0, dip2px(5), 0, dip2px(5));
		
		var mainLayout = new LinearLayout(CTX);
		mainLayout.setOrientation(1);
		mainLayout.setBackgroundColor(Color.DKGRAY);
		mainLayout.setOnClickListener(null);
		mainLayout.setPadding(dip2px(3), dip2px(3), dip2px(3), dip2px(3));
		parentLayout.addView(mainLayout, mainLayoutParams);
		
		var titleLayout = new RelativeLayout(CTX);
		titleLayout.setBackgroundColor(Color.GREEN);
		
		var closeButton = createButton(null, null, null, null, dip2px(50), dip2px(50), "close_button_normal.png", "close_button_pressed.png");
		closeButton.setId(ViewID.CLOSE_BUTTON);
		
		var closeButtonParams = new RelativeLayout.LayoutParams(dip2px(50), dip2px(50));
		closeButtonParams.addRule(RelativeLayout.ALIGN_PARENT_TOP);
		closeButtonParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
		
		var closeButtonOnClickListener = new OnClickListener() {
			onClick: function() {
				CTX.runOnUiThread(new Runnable() {
					run: function() {
						window.dismiss();
					}
				});
			}
		}
		closeButton.setOnClickListener(closeButtonOnClickListener);
		
		titleLayout.addView(closeButton, closeButtonParams);
		
		var titleTextParams = new RelativeLayout.LayoutParams(-1, dip2px(50));
		titleTextParams.addRule(RelativeLayout.LEFT_OF, ViewID.CLOSE_BUTTON);
		titleTextParams.addRule(RelativeLayout.CENTER_VERTICAL);
		
		var titleText = new TextView(CTX);
		titleText.setText("원하는 명령어를 선택하세요.");
		titleText.setTextSize(SP, 25);
		titleText.setTypeface(new Typeface.createFromFile(NANUM_GOTHIC_FILE));
		titleText.setTypeface(Typeface.DEFAULT_BOLD);
		titleText.setGravity(Gravity.CENTER);
		titleText.setBackground(Drawable.createFromPath(GUI_PATH + "/title_bar.png"));
		titleLayout.addView(titleText, titleTextParams);
		
		mainLayout.addView(titleLayout);
		
		var scrollView = new ScrollView(CTX);
		
		var contentLayout = new LinearLayout(CTX);
		contentLayout.setOrientation(1);
		contentLayout.setBackgroundColor(Color.BLUE);
		commandCustomDialogItems(window, contentLayout);
		
		scrollView.addView(contentLayout);
		
		mainLayout.addView(scrollView);
		
		return window;
	} catch(e) {
		toast(e, 1);
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
		
		//백업
		var backupOption = (loadOption("backup") != "false" ? true : false);
		if(backupOption) {
			if(!Array.isArray(backupArray[backupWorldNumber][backupIndex[backupWorldNumber]]))
				backupArray[backupWorldNumber][backupIndex[backupWorldNumber]] = new Array();
			backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1] = new Array();
			
			//현재 인덱스의 뒤의 원소들 모두 삭제
			backupArray[backupWorldNumber].splice([backupIndex[backupWorldNumber]] + 2, backupArray[backupWorldNumber].length - (backupIndex[backupWorldNumber] + 2));
		}
		
		for(var x = minPoint.x; x <= maxPoint.x; x++) {
			for(var y = minPoint.y; y <= maxPoint.y; y++) {
				for(var z = minPoint.z; z <= maxPoint.z; z++) {
					if(backupOption) //백업
					backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
					
					Level.setTile(x, y, z, id, data);
					blockCount++;
					
					if(backupOption) //for redo
					backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x, y, z, id, data]);
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 바뀌었습니다.");
		
		preventFolding(); //끼임 방지
		
		var chunk_x = parseInt(maxPoint.x - minPoint.x), chunk_z = parseInt(maxPoint.z - minPoint.z);
		if(chunk_x >= 4 || chunk_z >= 4)
			clientMessage(ChatColor.RED + "[경고!] 넓은 영역을 에딧하여 청크 오류로 맵 저장이 되지 않을 수도 있습니다.");
		
		backupIndex[backupWorldNumber]++;
		
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
		
		//백업
		var backupOption = (loadOption("backup") != "false" ? true : false);
		if(backupOption) {
			if(!Array.isArray(backupArray[backupWorldNumber][backupIndex[backupWorldNumber]]))
				backupArray[backupWorldNumber][backupIndex[backupWorldNumber]] = new Array();
			backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1] = new Array();
			
			//현재 인덱스의 뒤의 원소들 모두 삭제
			backupArray[backupWorldNumber].splice([backupIndex[backupWorldNumber]] + 2, backupArray[backupWorldNumber].length - (backupIndex[backupWorldNumber] + 2));
		}
		
		for(var y = minPoint.y; y <= maxPoint.y; y++) {
			for(var z = minPoint.z; ; z = maxPoint.z) {
				for(var x = minPoint.x; x <= maxPoint.x; x++) {
					if(backupOption) //백업
					backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
					
					Level.setTile(x, y, z, id, data);
					blockCount++;
					
					if(backupOption) //for redo
						backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x, y, z, id, data]);
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
		
		backupIndex[backupWorldNumber]++;
		
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
		
		//백업
		var backupOption = (loadOption("backup") != "false" ? true : false);
		if(backupOption) {
			if(!Array.isArray(backupArray[backupWorldNumber][backupIndex[backupWorldNumber]]))
				backupArray[backupWorldNumber][backupIndex[backupWorldNumber]] = new Array();
			backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1] = new Array();
			
			//현재 인덱스의 뒤의 원소들 모두 삭제
			backupArray[backupWorldNumber].splice([backupIndex[backupWorldNumber]] + 2, backupArray[backupWorldNumber].length - (backupIndex[backupWorldNumber] + 2));
		}
		
		var blockCount = 0;
		for(var x = minPoint.x; x <= maxPoint.x; x++) {
			for(var y = minPoint.y; y <= maxPoint.y; y++) {
				for(var z = minPoint.z; z <= maxPoint.z; z++) {
					if(Level.getTile(x, y, z) == fromId && Level.getData(x, y, z) == fromData) {
						if(backupOption) //백업
							backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
						
						Level.setTile(x, y, z, toId, toData);
						blockCount++;
						
						if(backupOption) //for redo
							backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x, y, z, toId, toData]);
					}
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 바뀌었습니다.");
		
		preventFolding();
		
		backupIndex[backupWorldNumber]++;
		
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
		
		//백업
		var backupOption = (loadOption("backup") != "false" ? true : false);
		if(backupOption) {
			if(!Array.isArray(backupArray[backupWorldNumber][backupIndex[backupWorldNumber]]))
				backupArray[backupWorldNumber][backupIndex[backupWorldNumber]] = new Array();
			backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1] = new Array();
			
			//현재 인덱스의 뒤의 원소들 모두 삭제
			backupArray[backupWorldNumber].splice([backupIndex[backupWorldNumber]] + 2, backupArray[backupWorldNumber].length - (backupIndex[backupWorldNumber] + 2));
		}
		
		var blockCount = 0;
		for(var y = minPoint.y; y <= maxPoint.y; y++) {
			for(var z = minPoint.z; ; z = maxPoint.z) {
				for(var x = minPoint.x; x <= maxPoint.x; x++) {
					if(Level.getTile(x, y, z) == fromId && Level.getData(x, y, z) == fromData) {
						if(backupOption) //백업
							backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
						
						Level.setTile(x, y, z, toId, toData);
						blockCount++;
						
						if(backupOption) //for redo
							backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x, y, z, toId, toData]);
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
		
		backupIndex[backupWorldNumber]++;
		
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
		
		//백업
		var backupOption = (loadOption("backup") != "false" ? true : false);
		if(backupOption) {
			if(!Array.isArray(backupArray[backupWorldNumber][backupIndex[backupWorldNumber]]))
				backupArray[backupWorldNumber][backupIndex[backupWorldNumber]] = new Array();
			backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1] = new Array();
			
			//현재 인덱스의 뒤의 원소들 모두 삭제
			backupArray[backupWorldNumber].splice([backupIndex[backupWorldNumber]] + 2, backupArray[backupWorldNumber].length - (backupIndex[backupWorldNumber] + 2));
		}
		
		var blockCount = 0;
		for(var x = minPoint.x; x <= maxPoint.x; x++) {
			for(var y = minPoint.y; y <= maxPoint.y; y++) {
				for(var z = minPoint.z; z <= maxPoint.z; z++) {
					if(Level.getTile(x, y, z) != preservedId || Level.getData(x, y, z) != preservedData) {
						if(backupOption) //백업
							backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
						
						Level.setTile(x, y, z, toId, toData);
						blockCount++;
						
						if(backupOption) //for redo
							backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x, y, z, toId, toData]);
					}
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 바뀌었습니다.");
		
		preventFolding();
		
		backupIndex[backupWorldNumber]++;
		
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
		
		//백업
		var backupOption = (loadOption("backup") != "false" ? true : false);
		if(backupOption) {
			if(!Array.isArray(backupArray[backupWorldNumber][backupIndex[backupWorldNumber]]))
				backupArray[backupWorldNumber][backupIndex[backupWorldNumber]] = new Array();
			backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1] = new Array();
			
			//현재 인덱스의 뒤의 원소들 모두 삭제
			backupArray[backupWorldNumber].splice([backupIndex[backupWorldNumber]] + 2, backupArray[backupWorldNumber].length - (backupIndex[backupWorldNumber] + 2));
		}
		
		var blockCount = 0;
		for(var x = minPoint.x; x <= maxPoint.x; x++) {
			for(var y = minPoint.y; y <= maxPoint.y; y++) {
				for(var z = minPoint.z; z <= maxPoint.z; z++) {
					var block = Level.getTile(x, y, z);
					if(block == 8 || block == 9 || block == 10 || block == 11) {
						if(backupOption) //백업
							backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
						
						Level.setTile(x, y, z, 0);
						blockCount++;
						
						if(backupOption) //for redo
							backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x, y, z, 0, 0]);
					}
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 바뀌었습니다.");
		
		backupIndex[backupWorldNumber]++;
		
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
		
		//백업
		var backupOption = (loadOption("backup") != "false" ? true : false);
		if(backupOption) {
			if(!Array.isArray(backupArray[backupWorldNumber][backupIndex[backupWorldNumber]]))
				backupArray[backupWorldNumber][backupIndex[backupWorldNumber]] = new Array();
			backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1] = new Array();
			
			//현재 인덱스의 뒤의 원소들 모두 삭제
			backupArray[backupWorldNumber].splice([backupIndex[backupWorldNumber]] + 2, backupArray[backupWorldNumber].length - (backupIndex[backupWorldNumber] + 2));
		}
		
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
					if(backupOption) //백업
						backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x + i, y + j, z + k, Level.getTile(x + i, y + j, z + k), Level.getData(x + i, y + j, z + k)]);
					
					Level.setTile(x + i, y + j, z + k, clipboard[i][j][k].id, clipboard[i][j][k].data);
					blockCount++;
					
					if(backupOption) //for redo
						backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x + i, y + j, z + k, clipboard[i][j][k].id, clipboard[i][j][k].data]);
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 붙여넣어졌습니다.");
		
		preventFolding();
		
		backupIndex[backupWorldNumber]++;
		
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
		//백업
		var backupOption = (loadOption("backup") != "false" ? true : false);
		if(backupOption) {
			if(!Array.isArray(backupArray[backupWorldNumber][backupIndex[backupWorldNumber]]))
				backupArray[backupWorldNumber][backupIndex[backupWorldNumber]] = new Array();
			backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1] = new Array();
			
			//현재 인덱스의 뒤의 원소들 모두 삭제
			backupArray[backupWorldNumber].splice([backupIndex[backupWorldNumber]] + 2, backupArray[backupWorldNumber].length - (backupIndex[backupWorldNumber] + 2));
		}
		
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
								if(backupOption) //백업
									backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x + i, y + j, z + k, Level.getTile(x + i, y + j, z + k), Level.getData(x + i, y + j, z + k)]);
								Level.setTile(x + i, y + j, z + k, id, data);
								if(backupOption) //for redo
									backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x + i, y + j, z + k, id, data]);
								blockCount++;
							}
							break;
						
						case "반구":
							if(backupOption) //백업
								backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x + i, y + j, z + k, Level.getTile(x + i, y + j, z + k), Level.getData(x + i, y + j, z + k)]);
							if((i * i) + (j * j) + (k * k) <= (radius * radius) && j >= 0) {
								Level.setTile(x + i, y + j, z + k, id, data);
								if(backupOption) //for redo
									backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x + i, y + j, z + k, id, data]);
								blockCount++;
							}
							break;
						
						case "빈구":
							if(backupOption) //백업
								backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x + i, y + j, z + k, Level.getTile(x + i, y + j, z + k), Level.getData(x + i, y + j, z + k)]);
							if((i * i) + (j * j) + (k * k) <= (radius * radius) && (i * i) + (j * j) + (k * k) >= (radius - 1) * (radius - 1)) {
								Level.setTile(x + i, y + j, z + k, id, data);
								if(backupOption) //for redo
									backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x + i, y + j, z + k, id, data]);
								blockCount++;
							}
							break;
						
						case "빈반구":
							if(backupOption) //백업
								backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x + i, y + j, z + k, Level.getTile(x + i, y + j, z + k), Level.getData(x + i, y + j, z + k)]);
							if((i * i) + (j * j) + (k * k) <= (radius * radius) && (i * i) + (j * j) + (k * k) >= (radius - 1) * (radius - 1) && j >= 0) {
								Level.setTile(x + i, y + j, z + k, id, data);
								if(backupOption) //for redo
									backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x + i, y + j, z + k, id, data]);
									blockCount++;
								}
							break;
						
						case "역반구":
							if(backupOption) //백업
								backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x + i, y + j, z + k, Level.getTile(x + i, y + j, z + k), Level.getData(x + i, y + j, z + k)]);
							if((i * i) + (j * j) + (k * k) <= (radius * radius) && j <= 0) {
								Level.setTile(x + i, y + j, z + k, id, data);
								if(backupOption) //for redo
									backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x + i, y + j, z + k, id, data]);
								blockCount++;
							}
							break;
						
						case "역빈반구":
							if(backupOption) //백업
								backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x + i, y + j, z + k, Level.getTile(x + i, y + j, z + k), Level.getData(x + i, y + j, z + k)]);
							if((i * i) + (j * j) + (k * k) <= (radius * radius) && (i * i) + (j * j) + (k * k) >= (radius - 1) * (radius - 1) && j <= 0) {
								Level.setTile(x + i, y + j, z + k, id, data);
								if(backupOption) //for redo
									backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x + i, y + j, z + k, id, data]);
								blockCount++;
							}
							break;
					}
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + josa(type, "이") + " 생성되었습니다. 총 " + blockCount + "개의 블럭이 변경되었습니다.");
		
		preventFolding();
		
		backupIndex[backupWorldNumber]++;
		
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
		
		//백업
		var backupOption = (loadOption("backup") != "false" ? true : false);
		if(backupOption) {
			if(!Array.isArray(backupArray[backupWorldNumber][backupIndex[backupWorldNumber]]))
				backupArray[backupWorldNumber][backupIndex[backupWorldNumber]] = new Array();
			backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1] = new Array();
			
			//현재 인덱스의 뒤의 원소들 모두 삭제
			backupArray[backupWorldNumber].splice([backupIndex[backupWorldNumber]] + 2, backupArray[backupWorldNumber].length - (backupIndex[backupWorldNumber] + 2));
		}
		
		var blockCount  = 0;
		for(var i = -radius + 1; i < radius; i++) for(var j = -radius + 1; j < radius; j++){
			switch(type) {
					case "원":
					if((i * i) + (j * j) <= (radius * radius)) {
						if(backupOption) //백업
							backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x + i, y, z + j, Level.getTile(x + i, y, z + j), Level.getData(x + i, y, z + j)]);
						
						Level.setTile(x + i, y, z + j, id, data);
						blockCount++;
						
						if(backupOption) //for redo
							backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x + i, y, z + j, id, data]);
					}
					break;
				case "빈원":
					if((i * i) + (j * j) <= (radius * radius) && (i * i) + (j * j) >= ((radius - 1) * (radius - 1))) {
						if(backupOption) //백업
							backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x + i, y, z + j, Level.getTile(x + i, y, z + j), Level.getData(x + i, y, z + j)]);
						
						Level.setTile(x + i, y, z + j, id, data);
						blockCount++;
						
						if(backupOption) //for redo
							backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x + i, y, z + j, id, data]);
					}
					break;
			}
		}
		
		clientMessage(ChatColor.GREEN + josa(type, "이") + " 생성되었습니다. 총 " + blockCount + "개의 블럭이 변경되었습니다.");
		
		preventFolding();
		
		backupIndex[backupWorldNumber]++;
		
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

function createCylinder(type, x, y, z, id, data, radius, height) {
	try {
		//프로그래스 다이얼로그 시작
		var progressDialog;
		CTX.runOnUiThread(new Runnable() {
			run: function() {
				progressDialog = ProgressDialog.show(CTX, josa(type, "을") + " 생성중입니다...", "잠시만 기다려주세요...", true, false);
			}
		});
		
		//백업
		var backupOption = (loadOption("backup") != "false" ? true : false);
		if(backupOption) {
			if(!Array.isArray(backupArray[backupWorldNumber][backupIndex[backupWorldNumber]]))
				backupArray[backupWorldNumber][backupIndex[backupWorldNumber]] = new Array();
			backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1] = new Array();
			
			//현재 인덱스의 뒤의 원소들 모두 삭제
			backupArray[backupWorldNumber].splice([backupIndex[backupWorldNumber]] + 2, backupArray[backupWorldNumber].length - (backupIndex[backupWorldNumber] + 2));
		}
		
		var blockCount  = 0;
		for(var h = 0; h < height; h++) {
			for(var i = -radius + 1; i < radius; i++) {
				for(var j = -radius + 1; j < radius; j++) {
					switch(type) {
						case "원기둥":
							if((i * i) + (j * j) <= (radius * radius)) {
								if(backupOption) //백업
									backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x + i, y + h, z + j, Level.getTile(x + i, y + h, z + j), Level.getData(x + i, y + h, z + j)]);
								
								Level.setTile(x + i, y + h, z + j, id, data);
								blockCount++;
								
								if(backupOption) //for redo
									backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x + i, y + h, z + j, id, data]);
							}
							break;
						
						case "빈원기둥":
							if((i * i) + (j * j) <= (radius * radius) && (i * i) + (j * j) >= ((radius - 1) * (radius - 1))) {
								if(backupOption) //백업
									backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x + i, y + h, z + j, Level.getTile(x + i, y + h, z + j), Level.getData(x + i, y + h, z + j)]);
								
								Level.setTile(x + i, y + h, z + j, id, data);
								blockCount++;
								
								if(backupOption) //for redo
									backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x + i, y + h, z + j, id, data]);
							}
							break;
					}
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + josa(type, "이") + "생성되었습니다. 총 " + blockCount + "개의 블럭이 변경되었습니다.");
		
		preventFolding();
		
		backupIndex[backupWorldNumber]++;
		
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

function getAreaLength(minPoint, maxPoint) {
	try {
		var xLength = (maxPoint.x - minPoint.x + 1);
		var yLength = (maxPoint.y - minPoint.y + 1);
		var zLength = (maxPoint.z - minPoint.z + 1);
		var volum = (xLength * yLength * zLength);
		
		clientMessage(ChatColor.GREEN + "[길이] x축 길이는 " + xLength + ", y축 길이는 " + yLength + ", z축 길이는 " + zLength + ", 총 블럭 개수는 " + volum + "개 입니다.");
	} catch(e) {
		toast("getAreaLength 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
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
		
		//백업
		var backupOption = (loadOption("backup") != "false" ? true : false);
		if(backupOption) {
			if(!Array.isArray(backupArray[backupWorldNumber][backupIndex[backupWorldNumber]]))
				backupArray[backupWorldNumber][backupIndex[backupWorldNumber]] = new Array();
			backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1] = new Array();
			
			//현재 인덱스의 뒤의 원소들 모두 삭제
			backupArray[backupWorldNumber].splice([backupIndex[backupWorldNumber]] + 2, backupArray[backupWorldNumber].length - (backupIndex[backupWorldNumber] + 2));
		}
		
		var blockCount = 0;
		for(var x = minPoint.x; x <= maxPoint.x; x++) {
			for(var z = minPoint.z; z <= maxPoint.z; z++) {
				for(var y = minPoint.y; y <= maxPoint.y; y++) {
					var block = Level.getTile(x, y, z);
					var topBlock = Level.getTile(x, y + 1, z);
					
					if(block != 0 && topBlock == 0) {
						if(backupOption) //백업
							backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
						
						Level.setTile(x, ++y, z, id, data);
						blockCount++;
						//break;
						
						if(backupOption) //for redo
							backupArray[backupWorldNumber][backupIndex[backupWorldNumber] + 1].push([x, y, z, id, data]);
					}
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 바뀌었습니다.");
		
		preventFolding();
		
		backupIndex[backupWorldNumber]++;
		
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

function backupSetting() {
	try {
		if(loadOption("backup") == "false") //백업 안 함 옵션
			return;
		
		if(backupArray.length == 0) { //백업 최초 실행
			backupArray[0] = new Array();
			backupArray[0].push(currentWorldDir);
			backupWorldNumber = 0;
			backupIndex[backupWorldNumber] = 1;
		} else { //백업한 흔적이 있는 경우
			backupWorldNumber = backupArray.length; //backupArray에 없는 새로운 월드인 경우
			for(var i in backupArray)
				if(backupArray[i][0] == currentWorldDir) { //backupArray에 이미 있는 월드인 경우
					backupWorldNumber = i;
					break;
				}
		}
	} catch(e) {
		toast("백업을 하는 과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function undo() {
	try {
		if(loadOption("backup") == "false") //백업 안 함 옵션
			return;
		
		if(backupIndex[backupWorldNumber] <= 1) //백업 없음
			return;
		
		backupIndex[backupWorldNumber]--;
		
		var blockCount = 0;
		for(var i in backupArray[backupWorldNumber][backupIndex[backupWorldNumber]]) {
			var x = backupArray[backupWorldNumber][backupIndex[backupWorldNumber]][i][0];
			var y = backupArray[backupWorldNumber][backupIndex[backupWorldNumber]][i][1];
			var z = backupArray[backupWorldNumber][backupIndex[backupWorldNumber]][i][2];
			var id = backupArray[backupWorldNumber][backupIndex[backupWorldNumber]][i][3];
			var data = backupArray[backupWorldNumber][backupIndex[backupWorldNumber]][i][4];
			
			Level.setTile(x, y, z, id, data);
			
			blockCount++;
		}
		clientMessage(ChatColor.GREEN + blockCount + "개의 블럭이 복원되었습니다.");
	} catch(e) {
		toast("되돌리기를 하는 과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function redo() {
	try {
		if(loadOption("backup") == "false") //백업 안 함 옵션
			return;
		try {
			if(backupIndex[backupWorldNumber] + 1 >= backupArray[backupWorldNumber][backupIndex[backupWorldNumber]].length) //되돌릴 것 없음
				return;
		} catch(e) { return; }
		
		backupIndex[backupWorldNumber]++;
		
		var blockCount = 0;
		for(var i in backupArray[backupWorldNumber][backupIndex[backupWorldNumber]]) {
			var x = backupArray[backupWorldNumber][backupIndex[backupWorldNumber]][i][0];
			var y = backupArray[backupWorldNumber][backupIndex[backupWorldNumber]][i][1];
			var z = backupArray[backupWorldNumber][backupIndex[backupWorldNumber]][i][2];
			var id = backupArray[backupWorldNumber][backupIndex[backupWorldNumber]][i][3];
			var data = backupArray[backupWorldNumber][backupIndex[backupWorldNumber]][i][4];
			
			Level.setTile(x, y, z, id, data);
			
			blockCount++;
		}
		clientMessage(ChatColor.GREEN + blockCount + "개의 블럭이 복원되었습니다.");
	} catch(e) {
		toast("다시실행 하는 과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function rotate(degree) {
	try {
		if(loadOption("backup") == "false") //백업 안 함
			return;
			
		if(clipboard == null) {
			clientMessage(ChatColor.RED + "먼저 영역을 복사해주세요.");
			return;
		}
		
		if(degree % 90 != 0 || degree >= 360 || degree <= 0) {
			clientMessage(ChatColor.RED + "회전각도는 90, 180, 270 중 하나이여야 합니다.");
			return;
		}
		
		var tempArray = new Array(clipboard[0][0].length);
		for(var i = 0; i < tempArray.length; i++) {
			tempArray[i] = new Array(clipboard[0].length);
			for(var j = 0; j < tempArray[0].length; j++) {
				tempArray[i][j] = new Array(clipboard.length);
				for(var k = 0; k < tempArray[0][0].length; k++)
					tempArray[i][j][k] = 0;
			}
		}
		
		for(var h = 1;  h <= degree / 90; h++) { //회전변환한 도형이 3, 4분면일 경우를 따지기 않기 위해 그냥 pi/2 회전변환을 반복시킨다.
			for(var i = 0; i < clipboard.length; i++) {
				for(var j = 0; j < clipboard[0].length; j++) {
					for(var k = 0; k < clipboard[0][0].length; k++) {
						var x = i, y = j, z = k;
						var _x = -z, _y = y, _z = x; //각 Θ = pi/2일 때 회전변환
						_x += clipboard[0][0].length - 1; //제 2사분면을 제 1사분면으로 평행이동
						tempArray[_x][_y][_z] = clipboard[x][y][z];
					}
				}
			}
			
			clipboard = tempArray;
		}
		
		toast(degree + "도 회전하였습니다.");
	} catch(e) {
		toast("회전 하는 과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}