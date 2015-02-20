cmake_minimum_required(VERSION 2.8.3)
project(joint_state_publisher_js)
find_package(catkin REQUIRED)

catkin_package()

install(DIRECTORY launch/ DESTINATION $(CATKIN_PACKAGE_SHARE_DESTINATION)/launch
  PATTERN "*.launch"
)

install(DIRECTORY examples/ DESTINATION $(CATKIN_PACKAGE_SHARE_DESTINATION)/examples
)

