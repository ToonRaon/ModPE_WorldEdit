/*
 * 월드에딧 스크립트 6.0
 * 제작 : 툰라온
 * 무단 수정 및 2차 배포 금지
 */
 
 //import
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
const BitmapDrawable = android.graphics.drawable.BitmapDrawable;
const Color = android.graphics.Color;
const Rect = android.graphics.Rect;
const NinePatchDrawable = android.graphics.drawable.NinePatchDrawable;

const Thread = java.lang.Thread;

const File = java.io.File;

const AlertDialog = android.app.AlertDialog;
const ProgressDialog = android.app.ProgressDialog;

const DialogInterface = android.content.DialogInterface;

const BufferedReader = java.io.BufferedReader;
const InputStreamReader = java.io.InputStreamReader;
const URL = java.net.URL;

const InputType = android.text.InputType;

//상수 선언
const CTX = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

const CURRENT_MAJOR_VERSION = 6;
const CURRENT_MINOR_VERSION = 0;

const VERSION_CHECK_URL = "https://raw.githubusercontent.com/ToonRaon/ModPE_WorldEdit/master/lastest_version.txt";
const LASTEST_MAJOR_VERSION = parseInt(readURL(VERSION_CHECK_URL, "array")[0].split("M_version=")[1]);
const LASTEST_MINOR_VERSION = parseInt(readURL(VERSION_CHECK_URL, "array")[1].split("m_version=")[1]);

const CHANGE_LOG_URL = "";

const SD_CARD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const RESOURCE_PATH = SD_CARD + "/games/com.mojang/worldedit/";
const ITEM_PATH = RESOURCE_PATH + "images/items/";
const ENTITY_PATH = RESOURCE_PATH + "images/entities/";
const GUI_PATH = RESOURCE_PATH + "images/gui/";

//GUI 선언
var shortcutWindow;

var commandDialog;

var GUIWindow;

//변수 선언
var firstPoint = {x: null, y: null, z: null};
var secondPoint = {x: null, y: null, z: null};

var canItemSelect = false;
var selectedItemId;
var selectedItemData;

var content;

var clipboard;

var radius = 0;
var height = 0;

var backupPoint = new Array(3);
var backupLength = new Array(3);
var backupCount = 0;
var backupBlock = new Array();

var curProgress = 0;

/* ---------------------------------------------------------------------------- ModPE Functions ---------------------------------------------------------------------------- */

//폴더생성
if(!java.io.File(RESOURCE_PATH).exists())
	java.io.File(RESOURCE_PATH).mkdirs();

//GUI 준비
makeGUIWindow();
makeShortcutWindow();

CTX.runOnUiThread(new java.lang.Runnable({
	run: function() {
		try {
			var 모장프로그래머들아최적화를제대로안하니까게임나갈때마다팅겨서내가이런버튼까지만들어야하잖아최적화좀제대로해라 = new Button(CTX);
			모장프로그래머들아최적화를제대로안하니까게임나갈때마다팅겨서내가이런버튼까지만들어야하잖아최적화좀제대로해라.setOnClickListener(new OnClickListener({
				onClick: function() {
					CTX.finish();
					
					var  intent = CTX.getPackageManager().getLaunchIntentForPackage("net.zhuoweizhang.mcpelauncher.pro");
					CTX.startActivity(intent);
				}
			}));
			
			var windowXP = new PopupWindow(모장프로그래머들아최적화를제대로안하니까게임나갈때마다팅겨서내가이런버튼까지만들어야하잖아최적화좀제대로해라, -2, -2);
			showWindow(windowXP, Gravity.LEFT | Gravity.TOP, 0, 0);
		} catch(e) {
			toast(e, 1);
		}
	}
}));

function selectLevelHook() {
	
}

function newLevel() {
	checkVersion();
	
	showWindow(shortcutWindow, Gravity.RIGHT | Gravity.TOP, 0, dip2px(35));
}

function leaveGame() {
	closeWindow(shortcutWindow);
}

function useItem(x, y, z, item, block, side, itemData, blockData) {
	if(item == 271) { //나무도끼
		preventDefault();
		setPoint(x, y, z, firstPoint, block, blockData);
	}
}

function procCmd(command) {
	//
}

function startDestroyBlock(x, y, z, side) {
	var item = Player.getCarriedItem();
	var block = Level.getTile(x, y, z);
	var blockData = Level.getData(x, y, z);
	
	if(item == 271) //나무도끼
		setPoint(x, y, z, secondPoint, block, blockData);
}

function destroyBlock() {
	var item = Player.getCarriedItem();
	
	if(item == 271) //나무도끼
		preventDefault();
}
/* ---------------------------------------------------------------------------- Custom Functions ---------------------------------------------------------------------------- */

function checkVersion() {
	if(LASTEST_MAJOR_VERSION == "" && LASTEST_MINOR_VERSION == "") return; //인터넷 연결 상태 불량
	
	if((CURRENT_MAJOR_VERSION < LASTEST_MAJOR_VERSION) || (CURRENT_MAJOR_VERSION == LASTEST_MAJOR_VERSION && CURRENT_MINOR_VERSION < LASTEST_MINOR_VERSION)) { //최신버전이 아닌 경우
		var listener = new DialogInterface.OnClickListener({
			onClick: function(dialog, which) {
				switch(which) {
					case DialogInterface.BUTTON_POSITIVE:
						toast("아직 미구현", 0);
						break;
					
					case DialogInterface.BUTTON_NEGATIVE:
						break;
				}
			}
		});
		alertDialog("알 림", "현재 버전보다 상위버전이 출시되었습니다. 제작자 블로그 또는 MCPE KOREA 카페를 통해 업데이트하는 것을 권장합니다.\n최신버전: " + LASTEST_MAJOR_VERSION + "." + LASTEST_MINOR_VERSION + "\n사용버전: " + CURRENT_MAJOR_VERSION + "," + CURRENT_MINOR_VERSION + "\n\n" + readURL(CHANGE_LOG_URL), listener, "제작자 블로그", null, "무시");
	} else {
		alertDialog("알 림", "이미 최신버전입니다.", null, null, null);
	}
}

function checkFiles() {
	//kasjdlkajskdljaskldjalkjsdkajsdlkajsd
	//kasjdlkajskdljaskldjalkjsdkajsdlkajsd
	//kasjdlkajskdljaskldjalkjsdkajsdlkajsd
	//kasjdlkajskdljaskldjalkjsdkajsdlkajsd
	//kasjdlkajskdljaskldjalkjsdkajsdlkajsd
}

function dip2px(dips) {
	return parseInt(dips * CTX.getResources().getDisplayMetrics().density + 0.5);
}

function toast(message, duration) {
	CTX.runOnUiThread(new java.lang.Runnable({
		run: function() {
			if(duration == null)
				duration = 0;
			new android.widget.Toast(CTX).makeText(CTX, message.toString(), duration).show();
		}
	}));
}

function readURL(url, returnType) {
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
	CTX.runOnUiThread(new java.lang.Runnable({
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
	CTX.runOnUiThread(new java.lang.Runnable({
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
	CTX.runOnUiThread(new java.lang.Runnable({
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

/*
function progressDialog(title, maxProgress, canCancel) {
	//내가 왜 이딴식으로 프로그래스다이얼로그를 코딩해놨지..
	
	CTX.runOnUiThread(new java.lang.Runnable({
		run: function() {
			try {
				curProgress = 0;
				
				var progressDialog = new ProgressDialog(CTX);
				progressDialog.setTitle(title.toString());
				progressDialog.setMessage(curProgress + "/" + maxProgress);
				progressDialog.setCancelable(canCancel);
				progressDialog.show();
			} catch(e) {
				toast("프로그래스 다이얼로그를 생성하는 과정에서 오류가 발생했습니다.\n" + e, 1);
			}
		}
	}));
	
	new Thread({
		run: function() {
			try {
				while(true) {
					Thread.sleep(1);
					
					CTX.runOnUiThread(new java.lang.Runnable({
						run: function() {
							progressDialog.setMessage(curProgress + "/" + maxProgress);
						}
					}));
					
					if(curProgress == maxProgress) { //작업 종료
						progressDialog.dismiss();
						break;
					}
				}
			} catch(e) {
				toast("프로그래스 다이얼로그를 동기화시키는 도중 오류가 발생했습니다.\n" + e, 1);
			}
		}
	}).start();
}
*/

function makeShortcutWindow() {
	CTX.runOnUiThread(new java.lang.Runnable({
		run: function() {
			try {
				var layout = new LinearLayout(CTX);
				layout.setOrientation(1);
				
				var buttonParams = new LinearLayout.LayoutParams(dip2px(35), dip2px(35));
				
				var axeButton = new Button(CTX);
				axeButton.setText("나무\n도끼");
				axeButton.setTextSize(SP, 10);
				axeButton.setPadding(0, 0, 0, 0);
				layout.addView(axeButton, buttonParams);
				
				var cmdButton = new Button(CTX);
				cmdButton.setText("명령어");
				cmdButton.setTextSize(SP, 10);
				cmdButton.setPadding(0, 0, 0, 0);
				layout.addView(cmdButton, buttonParams);
				
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
	CTX.runOnUiThread(new java.lang.Runnable({
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
							commandHandler(content[which].replace(/ /gi, "")); //replaceAll(" ", "");
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

function commandHandler(command) {
	try {
		var unnecessaryPointCommands = ["구", "반구", "빈구", "빈반구", "역반구", "역빈반구", "원", "빈원", "빈원기둥", "붙여넣기"];
		
		isPointNecessary = true;
		for each(var i in unnecessaryPointCommands)
			if(command == i) isPointNecessary = false;
		
		if(isPointNecessary) {
			if(firstPoint.x == null || secondPoint.x == null) return;
			
			var minPoint = {x: null, y: null, z: null};
			var maxPoint = {x: null, y: null, z: null};
			
			minPoint = comparePoint(0);
			maxPoint = comparePoint(1);
		}
		
		switch(command) {
			case "채우기":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId != null)
							fill(minPoint, maxPoint, selectedItemId, selectedItemData, false);
						
						//selectedItemId = null;
						//selectedItemData = null;
						//GUIWindow.setOnDismissListener(null);
					}
				}));
				break;
			
			case "벽":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId != null)
							fill(minPoint, maxPoint, selectedItemId, selectedItemData, true);
						
						selectedItemId = null;
						selectedItemData = null;
						GUIWindow.setOnDismissListener(null);
					}
				}));
				break;
			
			case "비우기":
				fill(minPoint, maxPoint, 0, 0, false);
				break;
			
			case "바꾸기":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				toast("어떤 블럭을 바꾸시겠습니까?", 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId == null) return;
						
						var fromId = selectedItemId;
						var fromData = selectedItemData;
						
						showWindow(GUIWindow, Gravity.CENTER, 0, 0);
						toast("어떤 블럭으로 바꾸시겠습니까?", 0);
						
						GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
							onDismiss: function() {
								if(selectedItemId == null) return;
								
								var toId = selectedItemId;
								var toData = selectedItemData;
								
								replace(minPoint, maxPoint, fromId, fromData, toId, toData, false);
								
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
						if(selectedItemId == null) return;
						
						var fromId = selectedItemId;
						var fromData = selectedItemData;
						
						showWindow(GUIWindow, Gravity.CENTER, 0, 0);
						toast("어떤 블럭으로 바꾸시겠습니까?", 0);
						
						GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
							onDismiss: function() {
								if(selectedItemId == null) return;
								
								var toId = selectedItemId;
								var toData = selectedItemData;
								
								replace(minPoint, maxPoint, fromId, fromData, toId, toData, true);
								
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
						if(selectedItemId == null) return;
						
						var preservedId = selectedItemId;
						var preservedData = selectedItemData;
						
						showWindow(GUIWindow, Gravity.CENTER, 0, 0);
						toast("어떤 블럭으로 바꾸시겠습니까?", 0);
						
						GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
							onDismiss: function() {
								if(selectedItemId == null) return;
								
								var toId = selectedItemId;
								var toData = selectedItemData;
								
								preserve(minPoint, maxPoint, preservedId, preservedData, toId, toData);
								
								selectedItemId = null;
								selectedItemData = null;
								GUIWindow.setOnDismissListener(null);
							}
						}));
					}
				}));
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
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				radiusSetting();
				toast("어떤 블럭으로 바꾸시겠습니까?", 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId == null) return;
						
						var id = selectedItemId;
						var data = selectedItemData;
						
						createSphere(command, Math.floor(Player.getX()), Math.floor(Player.getY() - 1), Math.floor(Player.getZ()), id, data, radius);
						
						selectedItemId = null;
						selectedItemData = null;
						GUIWindow.setOnDismissListener(null);
					}
				}));
				break;
			
			case "원":
			case "빈원":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				radiusSetting();
				toast("어떤 블럭으로 바꾸시겠습니까?", 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId == null) return;
						
						var id = selectedItemId;
						var data = selectedItemData;
						
						createSphere(command, Math.floor(Player.getX()), Math.floor(Player.getY() - 1), Math.floor(Player.getZ()), id, data, radius);
						
						selectedItemId = null;
						selectedItemData = null;
						GUIWindow.setOnDismissListener(null);
					}
				}));
				break;
			
			case "원기둥":
			case "빈원기둥":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				cylinderSetting();
				toast("어떤 블럭으로 바꾸시겠습니까?", 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId == null) return;
						
						var id = selectedItemId;
						var data = selectedItemData;
						
						createCylinder(command, Math.floor(Player.getX()), Math.floor(Player.getY() - 1), Math.floor(Player.getZ()), id, data, radius, height);
						
						selectedItemId = null;
						selectedItemData = null;
						GUIWindow.setOnDismissListener(null);
					}
				}));
				break;
			
			case "덮기":
				showWindow(GUIWindow, Gravity.CENTER, 0, 0);
				toast("어떤 블럭으로 덮으시겠습니까?", 0);
				GUIWindow.setOnDismissListener(new PopupWindow.OnDismissListener({
					onDismiss: function() {
						if(selectedItemId == null) return;
						
						var id = selectedItemId;
						var data = selectedItemData;
						
						cover(minPoint, maxPoint, id, data);
						
						selectedItemId = null;
						selectedItemData = null;
						GUIWindow.setOnDismissListener(null);
					}
				}));
				break;
		}
	} catch(e) {
		toast("커맨드 핸들러 함수에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function makeGUIWindow() {
	CTX.runOnUiThread(new java.lang.Runnable({
		run: function() {
			try {
				var rLayout = new RelativeLayout(CTX);
				rLayout.setGravity(Gravity.CENTER);
				rLayout.setBackgroundColor(Color.argb(128, 0, 0, 0));
				
				var tableParams = new RelativeLayout.LayoutParams(dip2px(630), dip2px(350));
				tableParams.setMargins(dip2px(5), dip2px(5), 0, 0);
				
				var table = new ImageView(CTX);
				var source = new BitmapFactory.decodeFile(GUI_PATH + "table.png");
				table.setImageBitmap(new Bitmap.createScaledBitmap(source, dip2px(630), dip2px(350), true));
				table.setId(1000);
				rLayout.addView(table, tableParams);
				
				var vLayout = new Array();
				
				var files = getAllFiles(ITEM_PATH);
				var currentPage = 0;
				vLayout = makeItemButtons(files, rLayout, vLayout, currentPage);
				
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
				pageTextParams.addRule(RelativeLayout.ALIGN_BOTTOM, 1000);
				pageTextParams.addRule(RelativeLayout.ALIGN_RIGHT, 1000);
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
			} catch(e) {
				toast(e, 1);
			}
		}
	}));
}

function getAllFiles(path) {
	try {
		var files = new Array();
		var list = new java.io.File(path).list();
		
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

function makeItemButtons(files, rLayout, vLayout, currentPage) {
	try {
		var vLayoutParams = new RelativeLayout.LayoutParams(-2, -2);
		vLayoutParams.setMargins(dip2px(10), dip2px(15), 0, 0);
		
		var buttonParams = new LinearLayout.LayoutParams(dip2px(50), dip2px(50));
		
		var itemButtonOnClickListener = new OnClickListener({
			onClick: function(view) {
				var fileName = files[parseInt(view.getId())];
				
				//toast(view.getId() + " : " + fileName, 1);
				toast(fileName.replace("-", ":").replace(".png", ""), 0);
				selectedItemId = parseInt(fileName.split("-")[0]);
				selectedItemData = parseInt(fileName.split("-")[1].split(".png")[0]);
				
				if(!canItemSelect && selectedItemId > 255) {
					toast("아이템은 선택할 수 없습니다.", 0);
					
					selectedItemId = null;
					selectedItemData = null;
					return;
				}
				
				GUIWindow.dismiss();
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
						if(java.io.File(ITEM_PATH + files[id]).exists())
							itemImage.setImageBitmap(new Bitmap.createScaledBitmap(src, dip2px(50), dip2px(50), true));
						else
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
	CTX.runOnUiThread(new java.lang.Runnable({
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
	CTX.runOnUiThread(new java.lang.Runnable({
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

function fill(minPoint, maxPoint, id, data, isWall) {
	try {
		var blockCount = 0;
		for(var x = minPoint.x; x <= maxPoint.x; x++) {
			for(var y = minPoint.y; y <= maxPoint.y; y++) {
				for(var z = minPoint.z; z <= maxPoint.z; z++) {
					if(isWall) if((minPoint.x + 1) <= x && x <= (maxPoint.x - 1) && (minPoint.z + 1) <= z && z <= (maxPoint.z - 1)) continue;
					Level.setTile(x, y, z, id, data);
					blockCount++;
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 바뀌었습니다.");
		
		preventFolding();
	} catch(e) {
		toast("fill 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function replace(minPoint, maxPoint, fromId, fromData, toId, toData, isWall) {
	try {
		var blockCount = 0;
		for(var x = minPoint.x; x <= maxPoint.x; x++) {
			for(var y = minPoint.y; y <= maxPoint.y; y++) {
				for(var z = minPoint.z; z <= maxPoint.z; z++) {
					if(Level.getTile(x, y, z) == fromId && Level.getData(x, y, z) == fromData) {
						if(isWall && (minPoint.x + 1) <= x && x <= (maxPoint.x - 1) && (minPoint.z + 1) <= z && z <= (maxPoint.z - 1)) continue;
						
						Level.setTile(x, y, z, toId, toData);
						blockCount++;
					}
				}
			}
		}
		
		clientMessage(ChatColor.GREEN + "총 " + blockCount + "개의 블럭이 성공적으로 바뀌었습니다.");
		
		preventFolding();
	} catch(e) {
		toast("replace 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function preserve(minPoint, maxPoint, preservedId, preservedData, toId, toData, isWall) {
	try {
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
	} catch(e) {
		toast("preserve 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function drain(minPoint, maxPoint) {
	try {
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
	} catch(e) {
		toast("replace 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function copy(minPoint, maxPoint) {
	try {
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
	} catch(e) {
		toast("paste 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function createSphere(type, x, y, z, id, data, radius) {
	try {
		//var firstPoint = [x - radius + 1, y - radius + 1, z - radius + 1];
		//var secondPoint = [x + radius - 1, y + radius - 1, z + radius - 1];
		
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
		
		clientMessage(ChatColor.GREEN + type + "(이)가 생성되었습니다. 총 " + blockCount + "개의 블럭이 변경되었습니다.");
		
		preventFolding();
	} catch(e) {
		toast("createSphere 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function createCircle(type, x, y, z, id, data, radius) {
	try {
		var firstPoint = [x - radius, y, z - radius];
		var secondPoint = [x + radius, y, z + radius];
		
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
		
		clientMessage(ChatColor.GREEN + type + "이 생성되었습니다. 총 " + blockCount + "개의 블럭이 변경되었습니다.");
		
		preventFolding();
	} catch(e) {
		toast("createCircle 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function createCylinder(type, x, y, z, id, radius, height) {
	var firstPoint = [x - radius, y, z - radius];
	var secondPoint = [x + radius, y + height, z + radius];
	
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
	
	clientMessage(ChatColor.GREEN + type + "이 생성되었습니다. 총 " + blockCount + "개의 블럭이 변경되었습니다.");
	
	preventFolding();
}

function cover(minPoint, maxPoint, id, data) {
	try {
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
	} catch(e) {
		toast("cover 명령어 실행과정에서 오류가 발생했습니다.\n" + e, 1);
	}
}

function backup(firstPoint, secondPoint) {
	//if(readData("backup") == "false") return;
	
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
	clientMessage(ChatColor.GREEN + blockCount+"개의 블럭이 복원되었습니다.");
	
	backupBlock.pop(); //마지막 원소 삭제
}